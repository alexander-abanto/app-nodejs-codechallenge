import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TransactionType } from './transactionType.output';
import { TransactionStatus } from './transactionStatus.output';

@ObjectType()
export class RetrieveTransactionOutput {
  @Field(() => ID)
  transactionExternalId: string;

  @Field(() => TransactionType)
  transactionType: TransactionType;

  @Field(() => TransactionStatus)
  transactionStatus: TransactionStatus;

  @Field()
  value: number;

  @Field()
  createdAt: Date;

  constructor(
    transactionExternalId: string,
    transactionType: TransactionType,
    transactionStatus: TransactionStatus,
    value: number,
    createdAt: Date
  ) {
    this.transactionExternalId = transactionExternalId;
    this.transactionType = transactionType;
    this.transactionStatus = transactionStatus;
    this.value = value;
    this.createdAt = createdAt;
  }
}
