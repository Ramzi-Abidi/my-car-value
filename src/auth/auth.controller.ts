import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { SigninUser } from 'src/users/dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UsersService,
    private readonly _authService: AuthService,
  ) {}

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
  signin(@Body() usersDetails: SigninUser) {
    try {
      const { email, password } = usersDetails;
      return this._authService.signin(email, password);
    } catch (err) {
      console.log(err);
      throw new HttpException('Error occured, please try again later !', 500);
    }
  }
}
