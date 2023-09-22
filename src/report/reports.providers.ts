import { USER_REPOSITORY } from 'src/utils/contants';
import { Report } from './entities/report.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: Report,
  },
];

// this is the repository
// this provider is used to communicate with the DB.
