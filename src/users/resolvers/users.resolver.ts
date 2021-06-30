import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../schemas/users.schema';

import { UsersService } from '../users.service';

import { ValidatePasswordPipe } from '../pipes/validate-password.pipe';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User, { description: 'create a new user' })
  async createUser(
    @Args('input', new ValidatePasswordPipe())
    createUserInputType: CreateUserInput,
  ) {
    return this.userService.create(createUserInputType);
  }
}
