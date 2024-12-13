import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artists } from './models/artist.models';

@Module({
  imports:[SequelizeModule.forFeature([Artists])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
