import * as mongoose from 'mongoose';

export const CatsSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
