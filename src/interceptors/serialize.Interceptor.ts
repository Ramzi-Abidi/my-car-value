import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassContructor {
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassContructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run smthng before a req is handled
    // by the req handler

    return handler.handle().pipe(
      map((userEntity: any) => {
        console.log("hey", userEntity);
        return plainToClass(this.dto, userEntity, {
          excludeExtraneousValues: true, // this will ensure that only properties with expose() decorator will appear in the result
        });
      }),
    );
  }
}
