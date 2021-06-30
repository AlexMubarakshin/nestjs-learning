import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './resolvers/users.resolver';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
