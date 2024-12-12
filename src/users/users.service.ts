import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.model';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)private UsersModule: typeof Users,

  ){}
  async createUsers(createUserDto: CreateUserDto)
  {
    const newUser = await this.UsersModule.create(createUserDto)
    return newUser
    }
  
  findAll() {
    return this.UsersModule.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.UsersModule.findByPk(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<Users> {
    const users = await this.UsersModule.findByPk(id);
  
    if (!users) {
      throw new NotFoundException(`Users with ID ${id} not found...`);
    }
    
    users.update(updateUserDto)
        
    return users; 
  }
  
  async remove(id: number):Promise<void> {
    const users = await this.UsersModule.findByPk(id);
    if (!users) {
      throw new NotFoundException(`Users with ID ${id} not found...`);
    }
    await users.destroy();
  }

}


