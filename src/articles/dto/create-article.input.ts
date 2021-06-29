import { InputType, OmitType } from '@nestjs/graphql';
import { Article } from '../schemas/article.schema';

@InputType()
export class CreateArticleInput extends OmitType(
  Article,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
