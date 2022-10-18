import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import UserUtils from '../utils/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    if (user && user.pass === pass) {
      return UserUtils.getUserInfoExceptPass(user);
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
