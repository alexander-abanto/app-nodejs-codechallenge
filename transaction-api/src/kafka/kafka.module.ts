import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionModule } from '../transactions/repository/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TransactionModule,
    ClientsModule.registerAsync([
      {
        name: 'YAPE_KAFKA',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const options: any = {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'stats',
                brokers: [configService.get<string>('KAFKA_BROCKER')],
                // ssl: true,
                // sasl: {
                //   mechanism: 'plain',
                //   username: configService.get<string>('KAFKA_USERNAME'),
                //   password: configService.get<string>('KAFKA_PASSWORD'),
                // },
              },
              consumer: {
                groupId: 'stats-service',
              },
            },
          };
          return options;
        },
      },
    ]),
  ],
  controllers: [KafkaController],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule { }
