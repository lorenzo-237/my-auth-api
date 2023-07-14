import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PREFIX,
  SESSION_MAX_AGE,
  SESSION_NAME,
} from './utils/constants';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const env = app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
    .setTitle('My authentication API')
    .setDescription('Cool description')
    .setVersion('1.0')
    .addTag('auth-api')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-doc', app, document);

  // Initialize client.
  const redisHost = REDIS_HOST(env);
  const redisPort = REDIS_PORT(env);
  const redisPrefix = REDIS_PREFIX(env);

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
      secret: env.get('SESSION_SALT'),
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
  await app.listen(parseInt(env.get<string>('APP_PORT')));
}
bootstrap();
