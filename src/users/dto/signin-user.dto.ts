import { IsEmail, IsString } from 'class-validator';

export class SigninUser {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
