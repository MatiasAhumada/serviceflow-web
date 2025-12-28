import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentOrder, Sale, CashMovement } from '../../entities';
import { CompletePaymentOrderDto } from './dto';
import { SALE_STATUS, MOVEMENT_TYPE } from '../../constants';

@Injectable()
export class PaymentOrdersService {
  constructor(
    @InjectRepository(PaymentOrder)
    private paymentOrdersRepository: Repository<PaymentOrder>,
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(CashMovement)
    private cashMovementsRepository: Repository<CashMovement>,
  ) {}

  async findAll(companyId: string): Promise<PaymentOrder[]> {
    return this.paymentOrdersRepository.find({
      where: { companyId },
      relations: ['sale', 'sale.customer', 'sale.seller', 'cashier', 'cashRegister'],
      order: { createdAt: 'DESC' },
    });
  }

  async findPending(companyId: string): Promise<PaymentOrder[]> {
    return this.paymentOrdersRepository.find({
      where: { companyId, status: 'pending' },
      relations: ['sale', 'sale.customer', 'sale.seller'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<PaymentOrder> {
    const order = await this.paymentOrdersRepository.findOne({
      where: { id, companyId },
      relations: ['sale', 'sale.customer', 'sale.seller', 'sale.items', 'sale.items.product', 'cashier', 'cashRegister'],
    });

    if (!order) {
      throw new NotFoundException('Orden de pago no encontrada');
    }

    return order;
  }

  async complete(id: string, companyId: string, cashierId: string, dto: CompletePaymentOrderDto): Promise<PaymentOrder> {
    const order = await this.findOne(id, companyId);

    if (order.status !== 'pending') {
      throw new BadRequestException('La orden ya fue procesada');
    }

    const sale = await this.salesRepository.findOne({
      where: { id: order.saleId },
    });

    if (!sale) {
      throw new NotFoundException('Venta no encontrada');
    }

    order.status = 'completed';
    order.cashierId = cashierId;
    order.completedAt = new Date(new Date().toISOString());
    if (dto.cashRegisterId) {
      order.cashRegisterId = dto.cashRegisterId;
    }

    await this.paymentOrdersRepository.save(order);

    sale.status = SALE_STATUS.COMPLETED;
    sale.cashierId = cashierId;
    if (dto.cashRegisterId) {
      sale.cashRegisterId = dto.cashRegisterId;
    }
    await this.salesRepository.save(sale);

    if (dto.cashRegisterId) {
      await this.cashMovementsRepository.save({
        saleId: sale.id,
        cashRegisterId: dto.cashRegisterId,
        userId: cashierId,
        companyId,
        type: MOVEMENT_TYPE.INCOME,
        amount: sale.total - (sale.discount || 0),
        concept: `Venta ${sale.saleNumber}`,
        notes: `Cobro - ${sale.paymentMethod}`,
        date: new Date(new Date().toISOString()),
      });
    }

    return this.findOne(id, companyId);
  }

  async cancel(id: string, companyId: string): Promise<PaymentOrder> {
    const order = await this.findOne(id, companyId);

    if (order.status !== 'pending') {
      throw new BadRequestException('Solo se pueden cancelar órdenes pendientes');
    }

    order.status = 'cancelled';
    await this.paymentOrdersRepository.save(order);

    const sale = await this.salesRepository.findOne({
      where: { id: order.saleId },
    });

    if (sale) {
      sale.status = SALE_STATUS.CANCELLED;
      await this.salesRepository.save(sale);
    }

    return order;
  }
}
