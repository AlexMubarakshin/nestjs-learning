import { ObjectId } from 'mongoose';
import { HideField, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BaseSchema {
  @Field(() => ID)
  id: string;

  @HideField()
  readonly _id?: ObjectId;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
