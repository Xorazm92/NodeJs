import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategryService } from './categry.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categry')
export class CategryController {
  constructor(private readonly categryService: CategryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategryDto: UpdateCategoryDto) {
    return this.categryService.update(+id, updateCategryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categryService.remove(+id);
  }
}
