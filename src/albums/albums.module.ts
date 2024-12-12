import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Albums } from './models/album.models'; 

@Module({
  imports: [SequelizeModule.forFeature([Albums])], 
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}

