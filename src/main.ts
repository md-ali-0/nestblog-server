import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const main = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.listen(8080);
};

main();
