import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOrder } from '../../entities';
import { SERVICE_STATUS } from '../../constants';

@Injectable()
export class ServiceOrdersService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrdersRepository: Repository<ServiceOrder>,
  ) {}

  async getStats(companyId: string) {
    const orders = await this.serviceOrdersRepository.find({
      where: { company: { id: companyId } },
    });

    const byStatus = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total: orders.length,
      received: byStatus[SERVICE_STATUS.RECEIVED] || 0,
      inProgress: byStatus[SERVICE_STATUS.IN_PROGRESS] || 0,
      completed: byStatus[SERVICE_STATUS.COMPLETED] || 0,
      delivered: byStatus[SERVICE_STATUS.DELIVERED] || 0,
      cancelled: byStatus[SERVICE_STATUS.CANCELLED] || 0,
      byStatus,
    };
  }

  async findAll(companyId: string): Promise<ServiceOrder[]> {
    return this.serviceOrdersRepository.find({
      where: { company: { id: companyId } },
      relations: ['customer', 'technician', 'receivedBy', 'items'],
      order: { entryDate: 'DESC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<ServiceOrder> {
    const order = await this.serviceOrdersRepository.findOne({
      where: { id, company: { id: companyId } },
      relations: ['customer', 'technician', 'receivedBy', 'items', 'warranty'],
    });

    if (!order) {
      throw new NotFoundException('Orden de servicio no encontrada');
    }

    return order;
  }

  async create(serviceOrderData: Partial<ServiceOrder>): Promise<ServiceOrder> {
    const lastOrder = await this.serviceOrdersRepository.findOne({
      where: { companyId: serviceOrderData.companyId },
      order: { createdAt: 'DESC' },
    });

    const orderNumber = lastOrder
      ? `OS-${String(parseInt(lastOrder.serviceNumber.split('-')[1]) + 1).padStart(6, '0')}`
      : 'OS-000001';

    const serviceOrder = this.serviceOrdersRepository.create({
      ...serviceOrderData,
      serviceNumber: orderNumber,
      status: SERVICE_STATUS.RECEIVED,
      entryDate: new Date(),
    });

    return this.serviceOrdersRepository.save(serviceOrder);
  }

  async updateStatus(
    id: string,
    status: string,
    companyId: string,
    notes?: string,
  ): Promise<ServiceOrder> {
    const order = await this.findOne(id, companyId);

    const validTransitions: Record<string, string[]> = {
      [SERVICE_STATUS.RECEIVED]: [
        SERVICE_STATUS.IN_PROGRESS,
        SERVICE_STATUS.CANCELLED,
      ],
      [SERVICE_STATUS.IN_PROGRESS]: [
        SERVICE_STATUS.COMPLETED,
        SERVICE_STATUS.CANCELLED,
      ],
      [SERVICE_STATUS.COMPLETED]: [SERVICE_STATUS.DELIVERED],
      [SERVICE_STATUS.DELIVERED]: [],
      [SERVICE_STATUS.CANCELLED]: [],
    };

    if (!validTransitions[order.status]?.includes(status)) {
      throw new BadRequestException(
        `No se puede cambiar de ${order.status} a ${status}`,
      );
    }

    order.status = status;
    if (notes) {
      order.notes = order.notes ? `${order.notes}\n${notes}` : notes;
    }

    if (status === SERVICE_STATUS.DELIVERED) {
      order.deliveryDate = new Date();
    }

    return this.serviceOrdersRepository.save(order);
  }

  async update(
    id: string,
    serviceOrderData: Partial<ServiceOrder>,
    companyId: string,
  ): Promise<ServiceOrder> {
    const order = await this.findOne(id, companyId);
    Object.assign(order, serviceOrderData);
    return this.serviceOrdersRepository.save(order);
  }

  async remove(id: string, companyId: string): Promise<void> {
    const order = await this.findOne(id, companyId);
    await this.serviceOrdersRepository.remove(order);
  }
}
