import mongoose from 'mongoose';
import { FeedbackDTO } from './types';
const { Schema } = mongoose;

type FeedbackModelType = FeedbackDTO & Document;

export const feedbacksScheme = new Schema({
  feedbackUid: String,
  rating: Number,
  message: String,
  createdAt: Date,
});

const feedbackSchema = new Schema<FeedbackModelType>({
  uid: String,
  feedbacks: [feedbacksScheme],
});

export const FeedbackModel = mongoose.model<FeedbackModelType>(
  'Feedbacks',
  feedbackSchema,
);
