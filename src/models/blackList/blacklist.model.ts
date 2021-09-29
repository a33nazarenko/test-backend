import mongoose from 'mongoose';
import { BlackListDTO } from './types';
const { Schema } = mongoose;

type BlacklistModelType = BlackListDTO & Document;

const blacklistSchema = new Schema<BlacklistModelType>({
  uid: String,
  blackList: [String],
});

export const BlacklistModel = mongoose.model<BlacklistModelType>(
  'Blacklist',
  blacklistSchema,
);
