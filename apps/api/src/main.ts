import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transformOptions: { enableImplicitConversion: true },
      transform: true,
    }),
  );
  app.setGlobalPrefix(globalPrefix);

  await app.listen(AppModule.port, () => {
    Logger.log(
      `Listening at http://localhost:${AppModule.port}/${globalPrefix}`,
    );
  });
}
bootstrap();
