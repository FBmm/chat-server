import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import UserUtils from '../utils/user';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(mobile: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByMobile(mobile);
    const hashPass = encryptPassword(pass, user.passSalt);
    if (user && user.pass === hashPass) {
      return UserUtils.getUserInfoExceptPass(user);
    }
    return null;
  }

  async login(user: any) {
    const payload = { mobile: user.mobile, sub: user.userId };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
