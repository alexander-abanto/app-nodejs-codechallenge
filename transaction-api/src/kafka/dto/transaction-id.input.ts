import { IsNotEmpty, IsUUID } from 'class-validator';

export class TransactionIdRequest {
    @IsUUID()
    @IsNotEmpty()
    transactionId: string;

    @IsNotEmpty()
    status: number;
}

export class TransactionIdResponse {
    @IsUUID()
    @IsNotEmpty()
    transactionId: string;
}