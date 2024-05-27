import { IsNotEmpty, IsUUID } from 'class-validator';

export class TransactionIdResponse {
    @IsUUID()
    @IsNotEmpty()
    transactionId: string;

    @IsNotEmpty()
    status: string;
}

export class TransactionIdRequest {
    @IsUUID()
    @IsNotEmpty()
    transactionId: string;
}