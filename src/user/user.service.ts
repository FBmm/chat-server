import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userRepository.createUser(createUserDto);
    return createdUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return 1;
  }

  async findOneByMobile(mobile: string) {
    const user = await this.userRepository.getUserByMobile(mobile);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
