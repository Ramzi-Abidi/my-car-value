import { USER_REPOSITORY } from 'src/utils/contants';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];

// this is the repository
// this provider is used to communicate with the DB.
