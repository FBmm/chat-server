import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    let user = await this.getUserByName(createUserDto.name);

    if (user) {
      throw new ConflictException('User already exists');
    }

    user = new this.userModel({
      name: createUserDto.name,
      pass: createUserDto.pass,
    });

    if (!user) {
      throw new ConflictException('User not created');
    }

    return user.save();
  }

  async getUserByName(name: string) {
    let user;
    try {
      user = await this.userModel.findOne({ name }, 'name pass').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!user) {
      return null;
    }

    return user;
  }
}
