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
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    const { email, password, name } = body;
    return this.usersService.create(name, email, password);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  updateUserDetails(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUserDetails(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
