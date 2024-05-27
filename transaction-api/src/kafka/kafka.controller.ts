import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Controller()
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) { }

  @MessagePattern('topic_yape_transaction')
  async messageYape(@Payload() payload: any) {
    Logger.log('topic_yape_transaction=>' + JSON.stringify(payload), KafkaController.name);
    await this.kafkaService.consumer(payload);
  }
}
