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
  async getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.getAlbumById(id);
  }

  @Get('name/:name')
  async getAlbumByName(@Param('name') name: string) {
    return this.albumsService.getAlbumByName(name);
  }

  @Patch(':id')
  async updateAlbum(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto
  ) {
    return this.albumsService.updateAlbums(id, updateAlbumDto);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.deleteAlbum(id);
  }
}
