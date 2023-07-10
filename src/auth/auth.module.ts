import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { HashService } from 'src/utils/services';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UsersModule],
  providers: [SessionSerializer, HashService, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
