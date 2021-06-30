import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CrudService } from 'src/common/services/crud.service';
import { CreateUserInput } from './dto/create-user.input';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService extends CrudService<User, CreateUserInput, unknown> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async create(createDto: CreateUserInput): Promise<User> {
    delete createDto.confirmPassword;
    const newUser = { ...createDto, isActive: true } as any;

    const user = new this.userModel(newUser);

    return user;
  }
}
