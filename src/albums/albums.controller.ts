import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.createAlbums(createAlbumDto);
  }

  @Get('all')
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.delete(id);
  }
}
