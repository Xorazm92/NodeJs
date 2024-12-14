// import { Injectable, NotFoundException } from "@nestjs/common";
// import { CreateCommentDto } from "./dto/create-comment.dto";
// import { UpdateCommentDto } from "./dto/update-comment.dto";
// import { Comments } from "./models/comment.models";
// import { CommentsModule } from "./comments.module";
// import { InjectModel } from "@nestjs/sequelize";

// @Injectable()
// export class CommentsService {
//   constructor(
//     @InjectModel(Comments) private commentModel: typeof CommentsModule
//   ) {}
//   create(createCommentDto: CreateCommentDto) {
//     return this.commentModel.create(createCommentDto);
//   }

//   findAll() {
//     return this.commentModel.findAll({ include: { all: true } });
//   }

//   findOne(id: number) {
//     return this.commentModel.findByPk(id);
//   }

//   async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comments> {
//     const comment = await this.commentModel.findByPk(id);

//     if(!comment){
//       throw new NotFoundException(`Bu ${id} li commit topilmadi`)
//     }
//     await comment.update(updateCommentDto);
//     return comment;
//   }

//   async remove(id: number): Promise<void> {
//     const comment = await this.commentModel.findByPk(id);
//     if(!comment){
//       throw new NotFoundException (`Bu ${id} li commit topilmadi`);
//     await comment.destroy();
//   }
//   }}


import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comments } from "./models/comment.models";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments) private commentModel: typeof Comments
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentModel.create(createCommentDto);
  }

  findAll() {
    return this.commentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.commentModel.findByPk(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comments> {
    const comment = await this.commentModel.findByPk(id);

    if(!comment){
      throw new NotFoundException(`Bu ${id} li commit topilmadi`);
    }
    await comment.update(updateCommentDto);
    return comment;
  }

  async remove(id: number): Promise<void> {
    const comment = await this.commentModel.findByPk(id);
    if(!comment){
      throw new NotFoundException(`Bu ${id} li commit topilmadi`);
    }
    await comment.destroy();
  }
}