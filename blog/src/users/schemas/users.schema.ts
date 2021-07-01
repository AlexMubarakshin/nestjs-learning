import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

import { BaseSchema } from 'src/common/base.schema';
import { TDocument } from 'src/common/services/crud.service';

@Schema({ timestamps: true })
@ObjectType()
export class User extends BaseSchema {
  @Field()
  @Prop({ unique: true, required: true })
  username: string;

  @Field()
  @Prop({ unique: true, required: true })
  email: string;

  @HideField()
  @Prop({ required: true })
  password: string;
}

export type UserDocument = TDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
