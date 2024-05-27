import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { RetrieveTransactionOutput } from './dto/retrieveTransaction.output'

@Resolver()
export class TransactionsResolver {

    constructor(
        private transactionService: TransactionsService,
    ) { }

    @Query(returns => [RetrieveTransactionOutput])
    transactions() {
        return this.transactionService.findAll();
    }

    @Query(returns => Transaction)
    transaction(@Args('id', { type: () => ID }) transactionId: string) {
        return this.transactionService.findById(transactionId);
    }

    @Mutation(returns => Transaction)
    async createTransaction(@Args('input') input: CreateTransactionInput) {
        const result = await this.transactionService.createTransaction(input);
        return result;
    }
}
