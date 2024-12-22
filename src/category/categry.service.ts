import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/categry.entity';

@Injectable()
export class CategryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>, // Category repository inject qilindi
  ) {}

  // Yangi kategoriya yaratish
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  // Barcha kategoriyalarni olish
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Bir kategoriya olish
  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  // Kategoriya yangilash
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto); // update qilish
    return this.categoryRepository.findOne({ where: { id } }); // yangilangan kategoriya
  }

  // Kategoriya o'chirish
  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
