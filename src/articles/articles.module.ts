import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './resolvers/articles.resolver';
import { Article, ArticleSchema } from './schemas/article.schema';

@Module({
  providers: [ArticlesResolver, ArticlesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema,
      },
    ]),
  ],
})
export class ArticlesModule {}
