import mongoose from 'mongoose';
import { locationScheme } from '../task/task.model';
import { User } from './types';
const { Schema } = mongoose;

type UserModelType = User & Document;

const userSchema = new Schema<User>({
  phoneNumber: String,
  uid: String,
  firstName: String,
  lastName: String,
  userName: String,
  location: locationScheme,
  avatarSrc: String,
  skills: [String],
  isWantSkills: [String],
  isCanSkills: [String],
  followings: [String],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }],
  privateTasks: [String],
  invitedUsersFromMe: [String],
  followers: [String],
  isVerify: Boolean,
  nominatedUser: String,
  joinedAt: Date,
  twitterNickname: String,
  facebookNickname: String,
  instagramNickname: String,
  firebaseUid: String,
  _id: mongoose.Types.ObjectId,
});

export const UserModel = mongoose.model<UserModelType>('Users', userSchema);
