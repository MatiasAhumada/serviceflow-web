import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Product, Supplier } from '../../entities';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getStats(companyId: string) {
    const products = await this.productsRepository.find({
      where: { companyId },
      select: ['stockQuantity', 'reorderLevel', 'cost'],
    });

    const total = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stockQuantity, 0);
    const lowStock = products.filter(p => p.stockQuantity <= (p.reorderLevel || 0)).length;
    const inventoryValue = products.reduce((sum, p) => sum + (p.cost || 0) * p.stockQuantity, 0);

    return { total, totalStock, lowStock, inventoryValue };
  }

  async findAll(query: QueryProductDto): Promise<Product[]> {
    const { companyId, search } = query;
    const where: Record<string, unknown> = {};

    if (companyId) {
      where.companyId = companyId;
    }

    if (search) {
      return this.productsRepository.find({
        where: [
          { ...where, name: ILike(`%${search}%`) },
          { ...where, sku: ILike(`%${search}%`) },
          { ...where, category: ILike(`%${search}%`) },
        ],
        relations: ['suppliers'],
        order: { createdAt: 'DESC' },
      });
    }

    return this.productsRepository.find({
      where,
      relations: ['suppliers'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id, companyId },
      relations: ['suppliers', 'saleItems'],
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { supplierId, ...productData } = createProductDto;
    const product = this.productsRepository.create(productData);
    
    if (supplierId) {
      const supplier = await this.productsRepository.manager.findOne(Supplier, { where: { id: supplierId } });
      if (supplier) {
        product.suppliers = [supplier];
      }
    }
    
    return this.productsRepository.save(product);
  }

  async update(id: string, companyId: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { supplierId, ...productData } = updateProductDto;
    const product = await this.findOne(id, companyId);
    Object.assign(product, productData);
    
    if (supplierId) {
      const supplier = await this.productsRepository.manager.findOne(Supplier, { where: { id: supplierId } });
      if (supplier) {
        product.suppliers = [supplier];
      }
    }
    
    return this.productsRepository.save(product);
  }

  async remove(id: string, companyId: string): Promise<void> {
    const product = await this.findOne(id, companyId);
    await this.productsRepository.remove(product);
  }
}