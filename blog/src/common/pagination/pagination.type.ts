import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

@ObjectType()
class PaginationInfo {
  @Field(() => Int)
  totalCount: number;

  @Field()
  hasPreviousPage: boolean;

  @Field()
  hasNextPage: boolean;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  nextPage: number;

  @Field(() => Int)
  prevPage: number;
}

export class Pagination<T> extends PaginationInfo {
  results: T[];
}

export const Paginated = <T>(classRef: Type<T>): any => {
  @ObjectType()
  class PaginationType extends PaginationInfo {
    @Field(() => [classRef])
    results: T[];
  }

  return PaginationType;
};
