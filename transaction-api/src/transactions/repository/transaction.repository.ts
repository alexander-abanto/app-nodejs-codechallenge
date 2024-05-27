import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionInput } from '../dto/create-transaction.input';
import { v4 as uuidv4 } from 'uuid';
import { TRANSACTION_STATUS } from '../../utility/constants';

@Injectable()
export class TransactionRepository {
    constructor(
        @InjectRepository(Transaction)
        private _repository: Repository<Transaction>,
    ) { }

    async findAll(): Promise<Transaction[]> {
        const trans = await this._repository.find();
        //console.log(trans);
        return trans;
    }

    async findById(tranferTypeId: string): Promise<Transaction| null> {
        // const transaction = await this._repository.findOne({
        //     where: {
        //         _id: transactionId,
        //     },
        // });
        const transaction = await this._repository.findOneBy({ _id: tranferTypeId });
        return transaction;
    }

    async createTransaction(input: CreateTransactionInput): Promise<Transaction> {
        const transaction = new Transaction();
        transaction._id = uuidv4();
        transaction.accountExternalIdDebit = input.accountExternalIdDebit;
        transaction.accountExternalIdCredit = input.accountExternalIdCredit;
        transaction.tranferTypeId = input.tranferTypeId;
        transaction.value = input.value;
        transaction.status = TRANSACTION_STATUS.pending;
        transaction.createdAt = new Date();
        const result = await this._repository.save(transaction);
        return result;
    }

    async updateTransactionStatus(transactionId: string, status: string): Promise<Transaction> {
        Logger.log('updateTransactionStatus init =>' + transactionId, TransactionRepository.name);
        const result = await this._repository.update({
            _id: transactionId
        }, {
            status: status
        });
        Logger.log('updateTransactionStatus end =>' + JSON.stringify(result.raw[0]), TransactionRepository.name);
        return result.raw[0];
    }
}
