import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt, Sale, Customer, User } from '../../entities';
import { CreateReceiptDto } from './dto';
import PDFDocument from 'pdfkit';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(companyId: string): Promise<Receipt[]> {
    return this.receiptsRepository.find({
      where: { companyId },
      relations: ['sale', 'customer', 'seller', 'technician', 'company'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<Receipt> {
    const receipt = await this.receiptsRepository.findOne({
      where: { id, companyId },
      relations: ['sale', 'sale.items', 'sale.items.product', 'customer', 'seller', 'technician', 'company'],
    });

    if (!receipt) {
      throw new NotFoundException('Comprobante no encontrado');
    }

    return receipt;
  }

  async findBySale(saleId: string, companyId: string): Promise<Receipt> {
    const receipt = await this.receiptsRepository.findOne({
      where: { saleId, companyId },
      relations: ['sale', 'sale.items', 'sale.items.product', 'customer', 'seller', 'technician', 'company'],
    });

    if (!receipt) {
      throw new NotFoundException('Comprobante no encontrado para esta venta');
    }

    return receipt;
  }

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const { saleId, technicianId, companyId } = createReceiptDto;

    const sale = await this.salesRepository.findOne({
      where: { id: saleId, companyId },
      relations: ['items', 'items.product', 'customer', 'seller'],
    });

    if (!sale) {
      throw new NotFoundException('Venta no encontrada');
    }

    const lastReceipt = await this.receiptsRepository.findOne({
      where: { companyId },
      order: { createdAt: 'DESC' },
    });

    const receiptNumber = this.generateReceiptNumber(lastReceipt?.receiptNumber);

    const receipt = this.receiptsRepository.create({
      companyId,
      saleId,
      customerId: sale.customerId,
      sellerId: sale.sellerId,
      technicianId,
      receiptNumber,
      date: new Date(),
      subtotal: sale.total,
      discount: sale.discount,
      total: sale.total - sale.discount,
      paymentMethod: sale.paymentMethod,
    });

    const savedReceipt = await this.receiptsRepository.save(receipt);

    return this.findOne(savedReceipt.id, companyId);
  }

  async generatePDF(receiptId: string, companyId: string): Promise<Buffer> {
    const receipt = await this.findOne(receiptId, companyId);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(20).text('FACTURA', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(receipt.company.name, { align: 'center' });
      if (receipt.company.cuit) {
        doc.fontSize(10).text(`CUIT: ${receipt.company.cuit}`, { align: 'center' });
      }
      if (receipt.company.address) {
        const address = receipt.company.address;
        doc.fontSize(10).text(
          `${address.street || ''}, ${address.city || ''}, ${address.state || ''}`,
          { align: 'center' }
        );
      }
      if (receipt.company.phone) {
        doc.fontSize(10).text(`Tel: ${receipt.company.phone}`, { align: 'center' });
      }
      if (receipt.company.email) {
        doc.fontSize(10).text(`Email: ${receipt.company.email}`, { align: 'center' });
      }

      doc.moveDown();
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.fontSize(10);
      doc.text(`Comprobante N°: ${receipt.receiptNumber}`, 50, doc.y);
      doc.text(`Fecha: ${new Date(receipt.date).toLocaleDateString()}`, 350, doc.y - 12);
      doc.moveDown();

      doc.fontSize(12).text('CLIENTE', { underline: true });
      doc.fontSize(10);
      doc.text(`Nombre: ${receipt.customer.name}`);
      if (receipt.customer.email) {
        doc.text(`Email: ${receipt.customer.email}`);
      }
      if (receipt.customer.phone) {
        doc.text(`Teléfono: ${receipt.customer.phone}`);
      }
      doc.moveDown();

      doc.fontSize(10).text(`Vendedor: ${receipt.seller.name}`);
      if (receipt.technician) {
        doc.text(`Técnico: ${receipt.technician.name}`);
      }
      doc.moveDown();

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.fontSize(12).text('DETALLE', { underline: true });
      doc.moveDown(0.5);

      const tableTop = doc.y;
      const itemX = 50;
      const qtyX = 300;
      const priceX = 380;
      const totalX = 480;

      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Producto', itemX, tableTop);
      doc.text('Cant.', qtyX, tableTop);
      doc.text('Precio', priceX, tableTop);
      doc.text('Total', totalX, tableTop);

      doc.moveTo(50, doc.y + 5).lineTo(550, doc.y + 5).stroke();
      doc.moveDown();

      doc.font('Helvetica');
      receipt.sale.items.forEach((item) => {
        const y = doc.y;
        doc.text(item.product.name, itemX, y, { width: 240 });
        doc.text(item.quantity.toString(), qtyX, y);
        doc.text(`$${Number(item.unitPrice).toFixed(2)}`, priceX, y);
        doc.text(`$${Number(item.subtotal).toFixed(2)}`, totalX, y);
        doc.moveDown();
      });

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      const totalsX = 400;
      doc.fontSize(10);
      doc.text('Subtotal:', totalsX, doc.y);
      doc.text(`$${Number(receipt.subtotal).toFixed(2)}`, totalX, doc.y - 12);
      doc.moveDown(0.5);

      if (receipt.discount > 0) {
        doc.text('Descuento:', totalsX, doc.y);
        doc.text(`-$${Number(receipt.discount).toFixed(2)}`, totalX, doc.y - 12);
        doc.moveDown(0.5);
      }

      doc.font('Helvetica-Bold').fontSize(12);
      doc.text('TOTAL:', totalsX, doc.y);
      doc.text(`$${Number(receipt.total).toFixed(2)}`, totalX, doc.y - 12);

      doc.moveDown();
      doc.font('Helvetica').fontSize(10);
      doc.text(`Método de pago: ${this.formatPaymentMethod(receipt.paymentMethod)}`);

      doc.end();
    });
  }

  async remove(id: string, companyId: string): Promise<void> {
    const receipt = await this.findOne(id, companyId);
    await this.receiptsRepository.remove(receipt);
  }

  private generateReceiptNumber(lastReceiptNumber?: string): string {
    if (!lastReceiptNumber) {
      return 'F-00001';
    }

    const number = parseInt(lastReceiptNumber.split('-')[1]) + 1;
    return `F-${number.toString().padStart(5, '0')}`;
  }

  private formatPaymentMethod(method: string): string {
    const methods = {
      cash: 'Efectivo',
      debit_card: 'Tarjeta de Débito',
      credit_card: 'Tarjeta de Crédito',
      transfer: 'Transferencia',
    };
    return methods[method] || method;
  }
}
