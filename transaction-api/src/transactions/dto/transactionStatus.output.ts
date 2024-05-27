import { ObjectType, Field } from '@nestjs/graphql';
import { TRANSACTION_STATUS, TRANSACTION_STATUS_NAME } from '../../utility/constants'
@ObjectType()
export class TransactionStatus {
    @Field()
    name: string;

    constructor(name: string) {
        if (name === TRANSACTION_STATUS.pending) {
            name = TRANSACTION_STATUS_NAME.pending;
        } else if (name === TRANSACTION_STATUS.approved) {
            name = TRANSACTION_STATUS_NAME.approved;
        } else if (name === TRANSACTION_STATUS.rejected) {
            name = TRANSACTION_STATUS_NAME.rejected;
        } else {
            name = "";
        }
        this.name = name;
    }
}
