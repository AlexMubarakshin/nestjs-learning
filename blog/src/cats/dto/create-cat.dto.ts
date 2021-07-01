import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateCatDto {
  @Field(() => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;
}
