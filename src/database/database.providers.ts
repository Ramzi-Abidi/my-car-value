import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from 'src/utils/contants';
import { User } from 'src/users/entities/user.entity';
import { Report } from 'src/report/entities/report.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Report]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
