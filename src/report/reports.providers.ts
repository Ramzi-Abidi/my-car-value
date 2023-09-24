import { REPORT_REPOSITORY } from 'src/utils/contants';
import { Report } from './entities/report.entity';

export const reportsProviders = [
  {
    provide: REPORT_REPOSITORY,
    useValue: Report,
  },
];

// This is the almost a repository
// This provider is used to communicate with the DB.
