import { ObjectType } from '@nestjs/graphql';

import { Paginated } from 'src/common/pagination/pagination.type';
import { User } from '../schemas/users.schema';

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
