import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SessionAuthGuard } from './auth/guards';
import { TestsModule } from './tests/tests.module';
import { ExtModule } from './ext/ext.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ExtModule,
    TestsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionAuthGuard,
    },
  ],
})
export class AppModule {}
