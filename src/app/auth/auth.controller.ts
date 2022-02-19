import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '../shared/decorators/is-public.decorator';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { User } from '.prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('user')
  async user(@CurrentUser() user: User) {
    return user;
  }
}
