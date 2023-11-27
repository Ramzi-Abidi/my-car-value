import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { SigninUser } from 'src/users/dto/signin-user.dto';
import { Serialize } from 'src/users/interceptors/serialize.Interceptor';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Serialize(UserDto)
  @Post('/signup')
  signup(@Body() usersDetails: CreateUserDto) {
    try {
      const { name, email, password } = usersDetails;
      return this._authService.signup(name, email, password);
    } catch (err) {
      console.log(err);
      throw new HttpException('Error occured, please try again later !', 500);
    }
  }

  @Post('/signin')
  signin(@Body() usersDetails: SigninUser, @Req() req: Request) {
    try {
      const { email, password } = usersDetails;
      return this._authService.signin(req, email, password);
    } catch (err) {
      console.log(err);
      throw new HttpException('Error occured, please try again later !', 500);
    }
  }
}
