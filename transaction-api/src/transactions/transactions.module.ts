import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TransactionModule } from './repository/transaction.module';

@Module({
  imports: [
    KafkaModule,
    TransactionModule,
  ],
  providers: [TransactionsService, TransactionsResolver],
})
export class TransactionsModule { }
