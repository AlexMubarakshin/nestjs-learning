import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../schemas/users.schema';

import { UsersService } from '../users.service';

import { ValidatePasswordPipe } from '../pipes/validate-password.pipe';
import { PaginatedUser } from '../dto/user.type';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { Pagination } from 'src/common/pagination/pagination.type';
import { Public } from 'src/auth/decorators';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Mutation(() => User, { description: 'create a new user' })
  @Public()
  async createUser(
    @Args('input', new ValidatePasswordPipe())
    createUserInputType: CreateUserInput,
  ) {
    return this.service.create(createUserInputType);
  }

  @Query(() => PaginatedUser, { description: 'get all users' })
  async allUsers(
    @Args('pageInfo', { nullable: true }) pageInfo: PaginationArgs,
  ): Promise<Pagination<User>> {
    return this.service.findAll({}, null, {}, pageInfo.page, pageInfo.pageSize);
  }
}
