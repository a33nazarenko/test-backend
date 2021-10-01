import mongoose, { Document } from 'mongoose';
import { ETaskStatus, TaskDTO, ETypeTask } from './types';
const { Schema } = mongoose;

export type TaskModelType = TaskDTO & Document;

export const locationScheme = new Schema({
  name: String,
  lat: Number,
  lng: Number,
});
const taskSchema = new Schema<TaskModelType>({
  createdTime: Date,
  name: String,
  categories: [String],
  address: locationScheme,
  remote: Boolean,
  fromTime: String,
  toTime: String,
  startDate: Date,
  endDate: Date,
  workDays: Boolean,
  weekends: Boolean,
  price: Number,
  priceType: String,
  description: String,
  type: {
    type: Number,
    enum: ETypeTask,
  },
  uid: { type: mongoose.Types.ObjectId, ref: 'Users' },
  isWant: Boolean,
  userIds: [mongoose.Types.ObjectId],
  respondIds: [String],
  taskStatus: {
    type: Number,
    enum: ETaskStatus,
  },
  acceptedFromCustomer: Boolean,
  acceptedFromExecutor: Boolean,
  isDoneFromExecutor: Boolean,
  isDoneFromCustomer: Boolean,
  isDone: Boolean,
});

export const TaskModel = mongoose.model<TaskModelType>('Tasks', taskSchema);
