import { Expose } from 'class-transformer';

// this class will be returned as a response
export class UserDto {
  @Expose()
  email: string;

  @Expose()
  name: string;
}
