import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { RetrieveTransactionOutput } from './dto/retrieveTransaction.output';
import { TransactionStatus } from './dto/transactionStatus.output';
import { TransactionType } from './dto/transactionType.output';
import { KafkaService } from '../kafka/kafka.service';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionsService {
    constructor(
        @Inject(TransactionRepository)
        private _transactionRepository: TransactionRepository,
        @Inject(KafkaService)
        private readonly kafkaService: KafkaService
    ) { }

    async findAll(): Promise<RetrieveTransactionOutput[]> {
        const trans = await this._transactionRepository.findAll();
        const results = trans.map(t => new RetrieveTransactionOutput(
            t._id,
            new TransactionType(t.tranferTypeId),
            new TransactionStatus(t.status),
            t.value,
            new Date(t.createdAt)
        ));
        return results;
    }

    async findById(transactionId: string): Promise<Transaction | null> {
        const trans = await this._transactionRepository.findById(transactionId);
        return trans;
    }

    async createTransaction(input: CreateTransactionInput): Promise<Transaction> {
        const result = await this._transactionRepository.createTransaction(input);
        //emit message to kafka for update transaction
        await this.kafkaService.producer(result._id);
        return result;
    }
}
