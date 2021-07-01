import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Success } from 'src/common/dto/success.type';

@InputType()
export class LoginInputType {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class JWTTokenResponseType extends Success {
  @Field()
  token?: string;
}
