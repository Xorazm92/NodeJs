import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return this.productRepository.find({ where: { is_active: true } });
  }

  async findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(productData: any) {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async update(id: number, productData: any) {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    product.is_active = false;
    return this.productRepository.save(product);
  }
}
