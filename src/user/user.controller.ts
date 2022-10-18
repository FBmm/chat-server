import {
  Controller,
  Get,
  Body,
  Res,
  HttpStatus,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TransformInterceptor } from '../common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/test-create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    createUserDto = {
      name: 'wuqian',
      pass: '0000',
    };
    const user = await this.userService.create(createUserDto);
    if (user) {
      return res.status(HttpStatus.OK).send(user);
    } else {
      return res.status(HttpStatus.OK).send(null);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @Get('/info')
  getProfile(@Request() req) {
    return null;
  }
}
