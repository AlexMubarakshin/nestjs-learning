import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInputType {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class JWTTokenResponseType {
  @Field()
  token?: string;

  @Field()
  success: boolean;
}
