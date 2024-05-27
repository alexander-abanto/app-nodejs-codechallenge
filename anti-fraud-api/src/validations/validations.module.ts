import { Module } from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { TransactionModule } from './repository/transaction.module';

@Module({
  imports: [TransactionModule],
  providers: [ValidationsService],
  exports: [ValidationsService],
})
export class ValidationsModule { }
