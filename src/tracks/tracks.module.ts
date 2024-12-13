import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackStatus } from './models/track.models';

@Module({
  imports: [SequelizeModule.forFeature([TrackStatus])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
