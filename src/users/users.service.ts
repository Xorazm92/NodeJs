import { Injectable } from '@nestjs/common';
import { User } from './model/user';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
      ) {}
    
      async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User> {
        const user = await this.userModel.findByPk(userId);
        if (!user) {
          throw new Error('User not found');
        }
    
        return user.update(updateProfileDto);
      }
    }
}
