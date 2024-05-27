import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_STATUS } from 'src/utility/constants';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class ValidationsService {
  constructor(
    @Inject(TransactionRepository)
    private _transactionRepository: TransactionRepository,
  ) { }

  async antiFraudValidate(id: string): Promise<Transaction> {
    const transaction = await this._transactionRepository.findById(id);
    if (!transaction) {
      const transactionError = new Transaction();
      transactionError.status = TRANSACTION_STATUS.rejected;
      transactionError.value = 0;
      return transactionError;
    }
    if (transaction.value <= 0 || transaction.value > 1000) {
      transaction.status = TRANSACTION_STATUS.rejected;
    } else {
      transaction.status = TRANSACTION_STATUS.approved;
    }
    return transaction;
  }
}
