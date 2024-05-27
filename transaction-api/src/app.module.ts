import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { KafkaModule } from './kafka/kafka.module';
import { TransactionModule } from './transactions/repository/transaction.module';
import { TransactionsService } from './transactions/transactions.service'
import { TransactionsResolver } from './transactions/transactions.resolver'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,

    }),
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
    TransactionsModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
