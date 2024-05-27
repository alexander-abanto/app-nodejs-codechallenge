import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      consumer: {
        groupId: 'kafka-yape-transaction',
      },
      client: {
        brokers: [configService.get<string>('KAFKA_BROCKER')],
        // ssl: true,
        // sasl: {
        //   mechanism: 'plain',
        //   username: configService.get<string>('KAFKA_USERNAME'),
        //   password: configService.get<string>('KAFKA_PASSWORD'),
        // },
      },
    },
  } as MicroserviceOptions);

  app.startAllMicroservices();

  // Configurar títulos de documentación
  const options = new DocumentBuilder()
    .setTitle('Transaction REST API')
    .setDescription('API REST para transacciones de yape')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get<number | undefined>('PORT');
  Logger.log('port =>' + port);
  await app.listen(port || 5000);
}
bootstrap();
