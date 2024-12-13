import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.models'; // To'g'ri yo'lni tekshiring

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  // Boshqa metodlarni qo'shing
}
