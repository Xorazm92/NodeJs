import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export abstract class BaseService<T> {
  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  constructor(private readonly repository: Repository<T>) {}

  protected async paginate(
    queryBuilder: SelectQueryBuilder<T>,
    dto: PaginationDto,
    cacheKey?: string,
  ) {
    const { page = 1, limit = 10, search, sortBy, order = 'ASC' } = dto;
    const skip = (page - 1) * limit;

    if (cacheKey) {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    if (sortBy) {
      queryBuilder.orderBy(`entity.${sortBy}`, order);
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const result = {
      items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };

    if (cacheKey) {
      await this.cacheManager.set(cacheKey, result);
    }

    return result;
  }

  protected createSearchQuery(
    queryBuilder: SelectQueryBuilder<T>,
    searchFields: string[],
    searchTerm: string,
  ): SelectQueryBuilder<T> {
    if (!searchTerm) return queryBuilder;

    const conditions = searchFields.map(
      (field) => `LOWER(entity.${field}) LIKE LOWER(:search)`,
    );

    return queryBuilder.andWhere(`(${conditions.join(' OR ')})`, {
      search: `%${searchTerm}%`,
    });
  }

  protected createFilterQuery(
    queryBuilder: SelectQueryBuilder<T>,
    filters: Record<string, any>,
  ): SelectQueryBuilder<T> {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
      }
    });

    return queryBuilder;
  }
}
