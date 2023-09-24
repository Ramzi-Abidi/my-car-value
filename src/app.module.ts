import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    UsersModule,
    ReportModule,
    DatabaseModule, // establish connection between our app and database
    ConfigModule.forRoot(),   // by default it will take the objet in .env file
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
