import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ValidationsModule } from 'src/validations/validations.module';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ValidationsModule,
    ClientsModule.registerAsync([
      {
        name: 'YAPE_KAFKA_ANTIFRAUD',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const options: any = {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'stats',
                brokers: [configService.get<string>('KAFKA_BROCKER')],
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
})
export class KafkaModule { }
