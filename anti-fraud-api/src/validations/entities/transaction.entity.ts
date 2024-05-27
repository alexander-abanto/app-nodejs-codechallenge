import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Transaction {
  @ObjectIdColumn()
  @Field()
  _id: string;

  @Column()
  @Field()
  accountExternalIdDebit: string;

  @Column()
  @Field()
  accountExternalIdCredit: string;

  @Column()
  @Field(type => Int)
  tranferTypeId: number;

  @Column()
  @Field(type => Float)
  value: number;

  @Column()
  @Field(type => Int)
  status: string;
}