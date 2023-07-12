import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import {
  APP_PORT,
  SESSION_NAME,
  SESSION_SALT,
  SESSION_MAX_AGE,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PREFIX,
} from './utils/constants';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  // Initialize client.
  const redisHost = REDIS_HOST(configService);
  const redisPort = REDIS_PORT(configService);
  const redisPrefix = REDIS_PREFIX(configService);
  const redisClient = createClient({
    socket: {
      host: redisHost,
      port: redisPort,
    },
  });

  try {
    await redisClient.connect();
    console.log(
      `[SESSION] Connected to redis [${redisHost}:${redisPort}] Prefix is ${redisPrefix}`,
    );
  } catch (err) {
    console.error(err);
  }

  app.use(
    session({
      name: SESSION_NAME,
      store: new RedisStore({
        client: redisClient,
        prefix: `${redisPrefix}:`,
      }),
      secret: SESSION_SALT,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESSION_MAX_AGE,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(APP_PORT);
}
bootstrap();
