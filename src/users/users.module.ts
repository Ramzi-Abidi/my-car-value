import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, CurrentUserInterceptor],
  exports: [UsersService],
})
export class UsersModule {}
