import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  app.use(helmet())


   app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('library management admin api')
    .setVersion('1.0')
    .addBasicAuth()
    .build()

  const documnet = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documnet);

  await app.listen(port, '0.0.0.0');
  console.log(`Server is running on port ${port}`);

}
bootstrap();
