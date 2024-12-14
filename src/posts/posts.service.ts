import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postmodel: typeof Post
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postmodel.create(createPostDto)
  }

  findAll() {
    return this.postmodel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.postmodel.findByPk(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto):Promise<Post>{
    const post = await this.postmodel.findByPk(id);

    if(!post){
      throw new NotFoundException(`Bu ${id} li commit topilmadi`)
    }
    post.update(updatePostDto)
        
    return post
  }

  async remove(id: number): Promise <void> {
    const post = await this.postmodel.findByPk(id);
    if(!post){
      throw new NotFoundException (`Bu ${id} li commit topilmadi`);
    }
    await post.destroy();
  }
}
