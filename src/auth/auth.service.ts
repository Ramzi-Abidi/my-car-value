import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(name: string, email: string, password: string) {
    // check if the user already exist
    const userExist: User = await this._userService.findByEmail(email);

    if (userExist) {
      return new BadRequestException('User already exist');
    }

    // hash the password
    const saltOrRounds: number = 10;

    // generate the salt
    const salt: string = await bcrypt.genSalt(saltOrRounds);

    // hash the password
    const hashedPassword: string = await bcrypt.hash(password, salt);

    // join the salt and the hashed password
    const result: string = salt + '.' + hashedPassword;
    console.log('result', result);

    // create the user
    const createdUser: User = await this._userService.create(
      name,
      email,
      result,
    );
    console.log('createdUser', createdUser);
    const payload = {
      sub: createdUser.dataValues.user_id,
      username: createdUser.dataValues.name,
    };
    const token: string = await this._jwtService.signAsync(payload);

    return {
      msg: 'User created successfully!',
      user: createdUser,
      access_token: token,
    };
  }

  async signin(req: Request, email: string, password: string) {
    const user: User = await this._userService.findByEmail(email);

    console.log(user);

    if (!user) {
      return new BadRequestException('User does not exist !');
    }

    const hash: string = this._userService.getHashedPassword(
      user.dataValues.password,
    );

    const result: boolean = await bcrypt.compare(password, hash);

    if (result === false) {
      return new BadRequestException('Invalid credentials !');
    }

    // create an interface for this object
    const payload = {
      sub: user.dataValues.user_id,
      username: user.dataValues.name,
    };

    const token: string = await this._jwtService.signAsync(payload);

    // generate new token and return it
    return {
      user,
      access_token: token,
    };
  }
}
