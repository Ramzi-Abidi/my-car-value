import { Expose } from 'class-transformer';

// this class will be returned as a response
export class UserDto {
  @Expose()
  user_id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
