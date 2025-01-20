import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../common/services/redis-cache.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: RedisCacheService,
  ) {}

  async findAll(dto: PaginationDto) {
    const cacheKey = this.cacheService.generateKey('products:all', dto);
    const cached = await this.cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const skip = (dto.page - 1) * dto.limit;
    const where = dto.search ? {
      OR: [
        { name: { contains: dto.search } },
        { info: { contains: dto.search } }
      ]
    } : {};

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: dto.limit,
        orderBy: { [dto.sortBy || 'createdAt']: dto.sortOrder || 'desc' }
      }),
      this.prisma.product.count({ where })
    ]);

    const result = {
      data,
      total,
      page: dto.page,
      limit: dto.limit,
      totalPages: Math.ceil(total / dto.limit)
    };

    await this.cacheService.set(cacheKey, result);
    return result;
  }

  async findOne(id: number) {
    const cacheKey = `product:${id}`;
    const cached = await this.cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const product = await this.prisma.product.findUnique({
      where: { id }
    });

    if (product) {
      await this.cacheService.set(cacheKey, product);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto
    });

    await this.cacheService.del('products:*');
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto
    });

    await Promise.all([
      this.cacheService.del('products:*'),
      this.cacheService.del(`product:${id}`)
    ]);

    return product;
  }

  async remove(id: number) {
    await this.prisma.product.delete({
      where: { id }
    });

    await Promise.all([
      this.cacheService.del('products:*'),
      this.cacheService.del(`product:${id}`)
    ]);

    return { id };
  }
}
