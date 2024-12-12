// Albums modeli
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Albums } from './models/albums.model';
import { AlbumsModule } from './albums.module';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Albums) private albumsModel: typeof Albums
  ) {}

 
  async createAlbums(createAlbumDto: CreateAlbumDto): Promise<Albums> {
    const toalbum = await this.albumsModel.create(createAlbumDto);
    return createAlbumDto;
  }

  async findAll(): Promise<Albums[]> {
    const toalbums = await this.albumsModel.findAll({ include: { all: true } });
    return toalbums;
  }

  async findOneById(id: number): Promise<Albums> {
    const toalbum = await this.albumsModel.findByPk(id);
    if (!toalbum) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return toalbum;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Albums> {
    const toalbum = await this.albumsModel.findByPk(id);
    if (!toalbum) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    await toalbum.update(updateAlbumDto);
    return toalbum;
  }


  async delete(id: number): Promise<void> {
    const toalbum = await this.albumsModel.findByPk(id);
    if (!toalbum) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    await toalbum.destroy();
  }
}
