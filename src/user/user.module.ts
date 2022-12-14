import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
