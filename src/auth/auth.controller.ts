import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
  Session,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards';
import { Public } from 'src/utils/decorators';

@Controller('auth')
export class AuthController {
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('session')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @Get('status')
  async getAuthStatus(@Req() req: any) {
    return req.user;
  }
}
