import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { BaseService } from '../../common/services/base.service';
import { RedisCacheService } from '../../common/services/redis-cache.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cacheService: RedisCacheService,
  ) {
    super(productRepository);
  }

  async findAll(dto: PaginationDto) {
    const cacheKey = this.cacheService.generateKey('products:all', dto);
    const cached = await this.cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const queryBuilder = this.productRepository
      .createQueryBuilder('entity');
    
    if (dto.search) {
      this.createSearchQuery(queryBuilder, ['name', 'description'], dto.search);
    }
    
    const result = await this.paginate(queryBuilder, dto);
    await this.cacheService.set(cacheKey, result);
    
    return result;
  }

  async findOne(id: number) {
    const cacheKey = `product:${id}`;
    const cached = await this.cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      await this.cacheService.set(cacheKey, product);
    }
    
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    await this.cacheService.del('products:all');
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    
    if (product) {
      await this.productRepository.save(product);
      await this.cacheService.del(`product:${id}`);
      await this.cacheService.del('products:all');
    }
    
    return product;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      return null;
    }
    const result = await this.productRepository.remove(product as Product);
    await this.cacheService.del(`product:${id}`);
    await this.cacheService.del('products:all');
    return result;
  }
}
