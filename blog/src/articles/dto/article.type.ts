import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/pagination/pagination.type';
import { Article } from '../schemas/article.schema';

@ObjectType()
export class PaginatedArticle extends Paginated(Article) {}
