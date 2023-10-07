import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.Interceptor';
import { UserDto } from './dto/user.dto';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post('')
  create(@Body() body: CreateUserDto) {
    try {
      const { email, password, name } = body;
      return this._usersService.create(name, email, password);
    } catch (err) {
      console.log(err);
      throw new HttpException('Error occured, please try again later !', 500);
    }
  }

  @Get()
  findAll() {
    try {
      return this._usersService.findAll();
    } catch (err) {
      console.log(err);
      throw new HttpException('Error occured, please try again later !', 500);
    }
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this._usersService.findOne(id);
    } catch (err) {
      console.log(err);
      throw new HttpException('Error occured, please try again later !', 500);
    }
  }

  @Get(':id')
  findByEmail(@Query('email') email: string) {
    try {
      return this._usersService.findByEmail(email);
    } catch (err) {
      console.log(err);
    }
  }

  @Patch(':id')
  updateUserDetails(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
      return this._usersService.updateUserDetails(id, body);
    } catch (err) {
      console.log(err);
      throw new HttpException('Error occured, please try again later !', 500);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._usersService.remove(id);
  }
}
