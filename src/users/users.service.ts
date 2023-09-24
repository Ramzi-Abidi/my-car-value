import {
  BadRequestException,
  ClassSerializerInterceptor,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { USER_REPOSITORY } from 'src/utils/contants';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(name: string, email: string, password: string) {
    try {
      const user = await this.findByEmail(email);
      if (user) {
        return new BadRequestException('User already exist !');
      }
      return await this.userRepository.create({ name, email, password });
    } catch (err) {
      console.log(err);
      return new HttpException('Error occured please try again !', 500);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll({});
    } catch (err) {
      console.log(err);
      return new HttpException('Error occured please try again !', 500);
    }
  }
  async findOne(id: string) {
    return await this.userRepository.findByPk(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async updateUserDetails(id: string, attributes: Partial<User>) {
    const user = await this.findOne(id);
    console.log(attributes);
    if (!user) {
      return new BadRequestException('User not found !');
    }

    Object.assign(user, attributes);

    return await user.save();
  }

  async remove(id: string) {
    const user = this.userRepository.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found !');
    }

    return await this.userRepository.destroy({
      where: {
        id,
      },
    });
  }
}
function UseInterceptorsnter(): (target: UsersService, propertyKey: "findOne", descriptor: TypedPropertyDescriptor<(id: string) => User>) => void | TypedPropertyDescriptor<(id: string) => User> {
  throw new Error('Function not implemented.');
}

