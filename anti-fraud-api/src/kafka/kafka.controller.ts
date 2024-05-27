import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionIdRequest } from './dto/transaction-id.input';
import { KafkaService } from './kafka.service';

@Controller()
export class KafkaController {
  constructor(private readonly _kafkaService: KafkaService) { }

  @MessagePattern('topic_yape_anti-fraud')
  async messageYape(@Payload() payload: any) {
    Logger.log('topic_yape_anti-fraud =>' + JSON.stringify(payload), KafkaController.name);
    const result = await this._kafkaService.consumer(payload.transactionId);
    await this._kafkaService.producer(result);
  }
}
