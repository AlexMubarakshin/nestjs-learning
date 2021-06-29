import { Field, ObjectType } from '@nestjs/graphql';
import { BaseSchema } from 'src/common/base.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TDocument } from 'src/common/services/crud.service';

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Article extends BaseSchema {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop({ required: true })
  body: string;
}

export type ArticleDocument = TDocument<Article>;

export const ArticleSchema = SchemaFactory.createForClass(Article);
