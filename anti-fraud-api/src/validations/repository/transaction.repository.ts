import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private _repository: Repository<Transaction>,
  ) { }

  async findById(transactionId: string): Promise<Transaction | null> {
    Logger.log('findById start =>' + transactionId, TransactionRepository.name);
    const transaction = await this._repository.findOne({
      where: {
        _id: transactionId,
      },
    });
    Logger.log('findById end =>' + JSON.stringify(transaction), TransactionRepository.name);
    return transaction;
  }
}
