import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjactRedis() private readonly redis: Redis,
  ) {}

  async findAll() {
    const redisData = await this.redis.keys('*');
    if(redisData.length > 0){
      const products = await this.redis.mget(redisData);
      console.log('catch hit');
      return products.map((product)=> JSON.parse(product));
    } else{
      const products = await this.productRepository.find();
      products.forEach(async (product) => {
        await this.redis.set(product.id, JSON.stringify(product))
      })
      console.log('catch miss');
      return products;      
    }
  }

  async findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(productData: any) {
    const product = this.productRepository.create(productData);
    await this.redis.set(result.id, JSON.stringify(result) )
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
