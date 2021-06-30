import { Model } from 'mongoose';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CrudService } from 'src/common/services/crud.service';
import { CreateUserInput } from './dto/create-user.input';
import { User, UserDocument } from './schemas/users.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService extends CrudService<User, CreateUserInput, unknown> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super(userModel);
  }

  async create(createDto: CreateUserInput): Promise<User> {
    createDto.password = await this.authService.createPassword(
      createDto.password,
    );

    delete createDto.confirmPassword;
    const newUser = { ...createDto, isActive: true } as any;

    const user = new this.userModel(newUser);

    await user.save();

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await super.findOne({ email });
  }
}
