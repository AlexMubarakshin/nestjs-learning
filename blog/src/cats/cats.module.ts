import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsResolver } from './cats.resolver';
import { CatsSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
  providers: [CatsResolver, CatsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Cat',
        schema: CatsSchema,
      },
    ]),
  ],
})
export class CatsModule {
  //
}
