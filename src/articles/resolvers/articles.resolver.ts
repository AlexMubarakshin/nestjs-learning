import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { CreateArticleInput } from '../dto/create-article.input';
import { ArticlesService } from '../articles.service';
import { Article } from '../schemas/article.schema';
import { PaginatedArticle } from '../dto/article.type';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { Pagination } from 'src/common/pagination/pagination.type';
import { CurrentUser, Public } from 'src/auth/decorators';
import { User } from 'src/users/schemas/users.schema';
import { Success } from 'src/common/dto/success.type';
import { ArticleIdInput } from '../dto/article-id.input';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly service: ArticlesService) {}

  @Mutation(() => Article, { description: 'create a new article' })
  async createArticle(
    @Args('input') createArticleInput: CreateArticleInput,
    @CurrentUser() currentUser: User,
  ): Promise<Article> {
    return await this.service.createWithUser(createArticleInput, currentUser);
  }

  @Public()
  @Query(() => PaginatedArticle, { description: 'get all articles' })
  async allArticles(
    @Args('pageInfo', { nullable: true }) pageInfo: PaginationArgs,
  ): Promise<Pagination<Article>> {
    return this.service.findAll({}, null, {}, pageInfo.page, pageInfo.pageSize);
  }

  @Mutation(() => Success, { description: 'delete an existing article' })
  async deleteArticle(
    @Args('input') articleDeleteInput: ArticleIdInput,
  ): Promise<Success> {
    const res = await this.service.delete({
      _id: articleDeleteInput.articleId,
    });

    return { success: res };
  }
}
