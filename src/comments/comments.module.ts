import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from 'sequelize-typescript';
import { Comments } from './models/comment.models';
import { CreateCommentDto } from './dto/create-comment.dto';

@Module({
  imports:[SequelizeModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {
  static findByPk(id: number) {
    throw new Error('Method not implemented.');
  }
  static findAll(createCommentDto: any) {
    throw new Error('Method not implemented.');
  }
  static create(createCommentDto: CreateCommentDto) {
    throw new Error('Method not implemented.');
  }
}
