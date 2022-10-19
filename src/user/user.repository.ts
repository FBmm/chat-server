import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    let user = await this.getUserByMobile(createUserDto.mobile);

    if (user) {
      throw new HttpException(
        { errcode: 40010, errmsg: 'User already exists' },
        HttpStatus.OK,
      );
    }

    user = new this.userModel({
      mobile: createUserDto.mobile,
      pass: createUserDto.pass,
      passSalt: createUserDto.passSalt,
    });

    if (!user) {
      throw new HttpException(
        { errcode: 40010, errmsg: 'User not created' },
        HttpStatus.OK,
      );
    }

    let result;
    try {
      result = await new Promise(function (resolve, reject) {
        user.save(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        });
      });
    } catch (err) {
      throw new HttpException(
        { errcode: 40010, errmsg: err?.message },
        HttpStatus.OK,
      );
    }
    return result;
  }

  async getUserByMobile(mobile: string) {
    let user;
    try {
      user = await this.userModel.findOne({ mobile }).exec();
    } catch (error) {
      throw new HttpException({ errcode: 40010, errmsg: error }, HttpStatus.OK);
    }

    if (!user) {
      return null;
    }

    return user;
  }
}
