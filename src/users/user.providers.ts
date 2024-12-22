import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSourse: DataSource) => dataSourse.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
