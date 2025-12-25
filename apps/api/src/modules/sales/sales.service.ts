import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, MoreThanOrEqual } from 'typeorm';
import { Sale, SaleItem, SaleCardDetail, CashMovement } from '../../entities';
import { CreateSaleDto, QuerySaleDto, UpdateSaleDto } from './dto';
import { SALE_STATUS, MOVEMENT_TYPE } from '../../constants';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private saleItemsRepository: Repository<SaleItem>,
    @InjectRepository(SaleCardDetail)
    private saleCardDetailsRepository: Repository<SaleCardDetail>,
    @InjectRepository(CashMovement)
    private cashMovementsRepository: Repository<CashMovement>,
  ) {}

  async getStats(companyId: string) {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalSales, todaySales, monthSales] = await Promise.all([
      this.salesRepository
        .createQueryBuilder('sale')
        .where('sale.companyId = :companyId', { companyId })
        .andWhere('sale.status = :status', { status: SALE_STATUS.COMPLETED })
        .select('COALESCE(SUM(sale.total), 0)', 'total')
        .getRawOne(),
      this.salesRepository
        .createQueryBuilder('sale')
        .where('sale.companyId = :companyId', { companyId })
        .andWhere('sale.date >= :startOfDay', { startOfDay })
        .andWhere('sale.status = :status', { status: SALE_STATUS.COMPLETED })
        .select('COUNT(*)', 'count')
        .addSelect('COALESCE(SUM(sale.total), 0)', 'total')
        .getRawOne(),
      this.salesRepository
        .createQueryBuilder('sale')
        .where('sale.companyId = :companyId', { companyId })
        .andWhere('sale.date >= :firstDayOfMonth', { firstDayOfMonth })
        .andWhere('sale.status = :status', { status: SALE_STATUS.COMPLETED })
        .select('COUNT(*)', 'count')
        .addSelect('COALESCE(SUM(sale.total), 0)', 'total')
        .getRawOne(),
    ]);

    return {
      totalSales: parseFloat(totalSales.total),
      todayCount: parseInt(todaySales.count),
      todayTotal: parseFloat(todaySales.total),
      monthCount: parseInt(monthSales.count),
      monthTotal: parseFloat(monthSales.total),
    };
  }

  async findAll(query: QuerySaleDto): Promise<Sale[]> {
    const { companyId, search, status, paymentMethod, customerId } = query;
    const queryBuilder = this.salesRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.customer', 'customer')
      .leftJoinAndSelect('sale.seller', 'seller')
      .leftJoinAndSelect('sale.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('sale.companyId = :companyId', { companyId });

    if (search) {
      queryBuilder.andWhere('sale.saleNumber ILIKE :search', { search: `%${search}%` });
    }

    if (status) {
      queryBuilder.andWhere('sale.status = :status', { status });
    }

    if (paymentMethod) {
      queryBuilder.andWhere('sale.paymentMethod = :paymentMethod', { paymentMethod });
    }

    if (customerId) {
      queryBuilder.andWhere('sale.customerId = :customerId', { customerId });
    }

    return queryBuilder.orderBy('sale.date', 'DESC').getMany();
  }

  async findOne(id: string, companyId: string): Promise<Sale> {
    const sale = await this.salesRepository.findOne({
      where: { id, companyId },
      relations: ['customer', 'seller', 'cashRegister', 'items', 'items.product'],
    });

    if (!sale) {
      throw new NotFoundException('Venta no encontrada');
    }

    // Cargar detalles de tarjeta si existe
    if (sale.paymentMethod === 'debit_card' || sale.paymentMethod === 'credit_card') {
      const cardDetail = await this.saleCardDetailsRepository.findOne({
        where: { saleId: sale.id },
      });
      if (cardDetail) {
        sale.cardDetail = cardDetail;
      }
    }

    return sale;
  }

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { items, cardDetail, companyId, sellerId, ...saleData } = createSaleDto;

    // Generar número de venta
    const lastSale = await this.salesRepository.findOne({
      where: { companyId },
      order: { createdAt: 'DESC' },
    });

    const saleNumber = this.generateSaleNumber(lastSale?.saleNumber);

    // Calcular total
    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    // Crear venta
    const sale = this.salesRepository.create({
      ...saleData,
      companyId,
      sellerId,
      saleNumber,
      total,
      date: saleData.date ? new Date(saleData.date) : new Date(),
      status: SALE_STATUS.COMPLETED,
    });

    const savedSale = await this.salesRepository.save(sale);

    // Crear items
    const saleItems = items.map((item) =>
      this.saleItemsRepository.create({
        saleId: savedSale.id!,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.quantity * item.unitPrice,
      }),
    );

    await this.saleItemsRepository.save(saleItems);

    // Guardar detalles de tarjeta si aplica
    if (cardDetail && (saleData.paymentMethod === 'debit_card' || saleData.paymentMethod === 'credit_card')) {
      await this.saleCardDetailsRepository.save({
        saleId: savedSale.id!,
        ...cardDetail,
      });
    }

    // Crear movimiento de caja automáticamente
    if (saleData.cashRegisterId) {
      await this.cashMovementsRepository.save({
        saleId: savedSale.id!,
        cashRegisterId: saleData.cashRegisterId,
        userId: sellerId,
        companyId,
        type: MOVEMENT_TYPE.INCOME,
        amount: total - (saleData.discount || 0),
        concept: `Venta ${saleNumber}`,
        notes: `Cobro automático - ${saleData.paymentMethod}`,
        date: saleData.date ? new Date(saleData.date) : new Date(),
      });
    }

    return this.findOne(savedSale.id!, companyId);
  }

  async update(id: string, updateSaleDto: UpdateSaleDto, companyId: string): Promise<Sale> {
    const sale = await this.findOne(id, companyId);
    const { items, discount } = updateSaleDto;

    let totalUpdated = false;

    // Actualizar items si se proporcionan
    if (items) {
      await this.saleItemsRepository.delete({ saleId: id });
      const saleItems = items.map((item) =>
        this.saleItemsRepository.create({
          saleId: id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.quantity * item.unitPrice,
        }),
      );
      await this.saleItemsRepository.save(saleItems);
      sale.total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
      totalUpdated = true;
    }

    // Actualizar descuento si se proporciona
    if (discount !== undefined) {
      sale.discount = discount;
      totalUpdated = true;
    }

    await this.salesRepository.save(sale);

    // Actualizar movimiento de caja en tiempo real si existe y hubo cambios
    if (sale.cashRegisterId && totalUpdated) {
      const movement = await this.cashMovementsRepository.findOne({
        where: { saleId: id },
      });
      if (movement) {
        const newAmount = sale.total - (sale.discount || 0);
        movement.amount = newAmount;
        movement.concept = `Venta ${sale.saleNumber} (Actualizada)`;
        movement.notes = `Actualización automática - ${sale.paymentMethod} - Total: $${sale.total} - Descuento: $${sale.discount || 0}`;
        await this.cashMovementsRepository.save(movement);
      }
    }

    return this.findOne(id, companyId);
  }

  async remove(id: string, companyId: string): Promise<void> {
    const sale = await this.findOne(id, companyId);

    // Eliminar movimiento de caja asociado
    if (sale.cashRegisterId) {
      await this.cashMovementsRepository.delete({ saleId: id });
    }

    await this.salesRepository.remove(sale);
  }

  async cancel(id: string, companyId: string): Promise<Sale> {
    const sale = await this.findOne(id, companyId);
    
    if (sale.status === SALE_STATUS.CANCELLED) {
      throw new NotFoundException('La venta ya está cancelada');
    }

    sale.status = SALE_STATUS.CANCELLED;
    await this.salesRepository.save(sale);

    // Crear movimiento de caja negativo para reflejar la cancelación en tiempo real
    if (sale.cashRegisterId) {
      const originalMovement = await this.cashMovementsRepository.findOne({
        where: { saleId: id },
      });
      
      if (originalMovement) {
        // Eliminar el movimiento original
        await this.cashMovementsRepository.delete({ saleId: id });
        
        // Crear movimiento de egreso por cancelación
        await this.cashMovementsRepository.save({
          cashRegisterId: sale.cashRegisterId,
          userId: sale.sellerId,
          companyId: sale.companyId,
          type: MOVEMENT_TYPE.EXPENSE,
          amount: originalMovement.amount,
          concept: `Cancelación de Venta ${sale.saleNumber}`,
          notes: `Venta cancelada - Devolución ${sale.paymentMethod}`,
          date: new Date(),
        });
      }
    }

    return sale;
  }

  private generateSaleNumber(lastSaleNumber?: string): string {
    if (!lastSaleNumber) {
      return 'V-00001';
    }

    const number = parseInt(lastSaleNumber.split('-')[1]) + 1;
    return `V-${number.toString().padStart(5, '0')}`;
  }
}
