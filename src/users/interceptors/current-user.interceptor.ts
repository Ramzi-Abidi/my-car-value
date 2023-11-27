import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {
    console.log("Current Interceptor is initialized !", usersService);
  }

  async intercept(context: ExecutionContext, handler: CallHandler) {
    // run smthng before a req is handled
    // by the req handler
    const req = context.switchToHttp().getRequest();

    const user_id: string = req.payload ? req.payload.sub : '';

    if (user_id !== '') {
      console.log('users service', this.usersService);
      const user = await this.usersService.findOne(user_id);
      req['user'] = user;
    }
    return handler.handle(); // like "next()"
  }
}
