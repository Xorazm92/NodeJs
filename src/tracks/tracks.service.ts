import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TrackStatus } from './models/track.models';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(TrackStatus) private TrackStatusModel: typeof TrackStatus
  ){}

  create(createTrackDto: CreateTrackDto) {
    return this.TrackStatusModel.create(CreateTrackDto);
  }

  findAll() {
    return this.TrackStatusModel.findAll({include: {all:true}});
  }

  findOne(id: number) {
    return this.TrackStatusModel.findByPk(id);
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
