import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configLoader } from './config/config-loader';
import { KafkaModule } from './kafka/kafka.module';
import { TransactionModule } from './validations/repository/transaction.module';
import { ValidationsModule } from './validations/validations.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGO_URL'),
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        authSource: 'admin',
        ssl: false,
        synchronize: true,
        useNewUrlParser: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configLoader],
    }),
    TransactionModule,
    ValidationsModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
