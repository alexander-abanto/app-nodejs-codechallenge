import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionRepository } from '../transactions/repository/transaction.repository';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('YAPE_KAFKA')
    private readonly _kafka: ClientKafka,

    @Inject(TransactionRepository)
    private readonly _transactionRepository: TransactionRepository,
  ) {
    this._kafka.connect();
  }

  async producer(transactionId: string) {
    Logger.log('producer =>' + transactionId, KafkaService.name);
    this._kafka.emit('topic_yape_anti-fraud', {
      transactionId,
    });
  }

  async consumer(input: any) {
    Logger.log('consumer =>' + JSON.stringify(input), KafkaService.name);
    const result = await this._transactionRepository.updateTransactionStatus(input.transactionId, input.status);
    Logger.log('Update data =>' + JSON.stringify(result), KafkaService.name);
  }
}