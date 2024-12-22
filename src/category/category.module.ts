import { Module } from '@nestjs/common';
import { CategryService } from './categry.service';
import { CategryController } from './category.controller';
import { categoryProviders } from './category.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategryController],
  providers: [...categoryProviders, CategryService],
})
export class CategoryModule {}
