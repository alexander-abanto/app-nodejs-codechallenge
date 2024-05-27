import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ValidationsService } from 'src/validations/validations.service';
import { TransactionIdResponse } from './dto/transaction-id.input';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('YAPE_KAFKA_ANTIFRAUD')
    private readonly _kafka: ClientKafka,

    @Inject(ValidationsService)
    private readonly _validationService: ValidationsService,
  ) {
    this._kafka.connect();
  }

  async producer(input: any) {
    Logger.log('producer =>' + JSON.stringify(input), KafkaService.name);
    this._kafka.emit('topic_yape_transaction', {
      transactionId: input.transactionId,
      status: input.status,
    });
  }

  async consumer(id: string): Promise<TransactionIdResponse> {
    Logger.log('consumer =>' + id, KafkaService.name);
    const result = new TransactionIdResponse();
    const transaction = await this._validationService.antiFraudValidate(id);
    result.transactionId = transaction._id;
    result.status = transaction.status;
    Logger.log('consumer result=>' + JSON.stringify(result), KafkaService.name);
    return result;
  }
}
