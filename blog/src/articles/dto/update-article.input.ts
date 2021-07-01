import { ObjectId } from 'mongoose';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

import { CreateArticleInput } from './create-article.input';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => ID)
  id: ObjectId;
}
