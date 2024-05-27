import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateTransactionInput {

    @IsNotEmpty()
    @IsUUID()
    @Field()
    accountExternalIdDebit: string;

    @IsNotEmpty()
    @IsUUID()
    @Field()
    accountExternalIdCredit: string;

    @IsNotEmpty()
    @Field(type => Int)
    tranferTypeId: number;

    @IsNotEmpty()
    @Field(type => Float)
    value: number;
}