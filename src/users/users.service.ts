import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.models'; // To'g'ri yo'lni tekshiring
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersModel.create(createUserDto);
  }

  async findAll(options?: any) {
    return this.usersModel.findAll(options);
  }

  async findOne(options: any) {
    return this.usersModel.findOne(options);
  }

  async findByPk(id: number) {
    return this.usersModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersModel.update(updateUserDto, { where: { id } });
    return this.findByPk(id);
  }
}
