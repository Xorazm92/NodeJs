import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { RedisCacheModule } from '../../common/modules/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService]
})
export class ProductsModule {}
