import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Albums } from './models/album.models'; // Albums modelini import qilish

@Module({
  imports: [SequelizeModule.forFeature([Albums])], // Vergul qo'shildi
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}

