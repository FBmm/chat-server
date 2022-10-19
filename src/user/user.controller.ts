import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TransformInterceptor } from '../common';
import { HttpException } from '@nestjs/common';
import { encryptPassword, makeSalt } from '../utils/cryptogram';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @Get('/info')
  getUserInfo(@Request() req) {
    return null;
  }

  @Post('/register')
  @UseInterceptors(TransformInterceptor)
  async userRegister(@Request() req) {
    console.log(req.body);
    const { code, ...result } = req.body;
    if (code !== '1234') {
      throw new HttpException(
        { errcode: 40010, errmsg: '验证码错误' },
        HttpStatus.OK,
      );
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(result.pass, salt);
    result.pass = hashPwd;
    result.passSalt = salt;
    const user = await this.userService.create(result);
    return user;
  }
}
