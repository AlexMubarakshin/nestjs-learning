import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { CreateArticleInput } from '../dto/create-article.input';
import { ArticlesService } from '../articles.service';
import { Article } from '../schemas/article.schema';
import { PaginatedArticle } from '../dto/article.type';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { Pagination } from 'src/common/pagination/pagination.type';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly service: ArticlesService) {}

  @Mutation(() => Article, { description: 'create a new article' })
  async createArticle(
    @Args('input') createArticleInput: CreateArticleInput,
  ): Promise<Article> {
    return await this.service.create(createArticleInput);
  }

  @Query(() => PaginatedArticle, { description: 'get all articles' })
  async allArticles(
    @Args('pageInfo', { nullable: true }) pageInfo: PaginationArgs,
  ): Promise<Pagination<Article>> {
    return this.service.findAll({}, null, {}, pageInfo.page, pageInfo.pageSize);
  }
}
