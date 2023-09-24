import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global req validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  //enable CORS origin
  app.enableCors();
  // global prefix
  app.setGlobalPrefix('api/v1/');
  // listening to port 5000
  await app.listen(5000);
}
bootstrap();
