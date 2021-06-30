import { IsNotEmpty, MinLength } from 'class-validator';

import { Field, InputType, OmitType } from '@nestjs/graphql';

import { User } from '../schemas/users.schema';

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {
  @IsNotEmpty()
  @Field()
  confirmPassword: string;

  @IsNotEmpty()
  @MinLength(5)
  @Field()
  password: string;
}
