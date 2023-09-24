import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { UserDto } from 'src/users/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run smthng before a req is handled
    // by the req handler

    console.log('running before the handler', context);

    return handler.handle().pipe(
      map((userEntity: any) => {
        console.log(userEntity);
        return plainToClass(UserDto, userEntity, {
          excludeExtraneousValues: true, // this will ensure that only properties with expose() decorator will appear in the result
        });
      }),
    );
  }
}
