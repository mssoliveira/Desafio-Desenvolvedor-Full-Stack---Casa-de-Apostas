import {
  BadRequestException,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

Logger.overrideLogger(['error', 'warn', 'log', 'debug', 'verbose']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Cadastro de Clientes')
    .setDescription('Desafio Fullstack')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // cors config
  app.enableCors();
  // validation error handler
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const message = validationErrors
          ? validationErrors[0]?.constraints?.[
              Object.keys(validationErrors[0]?.constraints)[0]
            ]
          : 'Bad Request';
        return new BadRequestException(message);
      },
    }),
  );
  // Running
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0', () => {
    Logger.log(`🚀 Server is running on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
