// Albums modeli
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Albums } from './models/albums.model';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Albums) private albumsModel: typeof Albums,
  ) {}

  // Albom yaratish
  async create(createAlbumDto: CreateAlbumDto): Promise<Albums> {
    const album = await this.albumsModel.create(createAlbumDto);
    return album;
  }

  // Barcha albomlarni olish
  async findAll(): Promise<Albums[]> {
    const albums = await this.albumsModel.findAll({ include: { all: true } });
    return albums;
  }

  // ID bo‘yicha albomni olish
  async findOneById(id: number): Promise<Albums> {
    const album = await this.albumsModel.findByPk(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return album;
  }

  // Albomni yangilash
  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Albums> {
    const album = await this.albumsModel.findByPk(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    await album.update(updateAlbumDto);
    return album;
  }

  // Albomni o‘chirish
  async delete(id: number): Promise<void> {
    const album = await this.albumsModel.findByPk(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    await album.destroy();
  }
}
