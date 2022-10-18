import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { TransformInterceptor } from './common';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
