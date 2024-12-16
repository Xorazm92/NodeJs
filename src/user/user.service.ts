import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newData = this.userModel.create(createUserDto);
    return newData;
  }

  async getAll(): Promise<User[]> {
    const data = await this.userModel.findAll({ include: { all: true } });
    return data;
  }

  async getOne(id: number): Promise<User> {
    const data = await this.userModel.findByPk(id, { include: { all: true } });
    return data;
  }

  async getByEmail(email: string) {
    const data = await this.userModel.findAll({ where: { email } });
    return data.length > 0 ? data[0] : false;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const editData = await this.userModel.update(updateUserDto, {
      where: { id },
    });
    return editData;
  }

  async remove(id: number) {
    const data = await this.userModel.destroy({
      where: { id },
    });
    return data;
  }
}
