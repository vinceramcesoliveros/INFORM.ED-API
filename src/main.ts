import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const options = new DocumentBuilder()
    .setTitle('INFORM.ED API')
    .setDescription('Open API standards')
    .setVersion('0.1')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
console.log(process.env.NODE_ENV);
bootstrap();
