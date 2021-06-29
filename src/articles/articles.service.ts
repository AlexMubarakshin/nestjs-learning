import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CrudService } from 'src/common/services/crud.service';

import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@Injectable()
export class ArticlesService extends CrudService<
  Article,
  CreateArticleInput,
  UpdateArticleInput
> {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {
    super(articleModel);
  }
}
