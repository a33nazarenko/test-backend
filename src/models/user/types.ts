import { GooglePlaceInfo, TaskDTO } from '../task/types';
import mongoose from 'mongoose';

export interface User {
  _id: mongoose.Types.ObjectId;
  phoneNumber: string;
  uid: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  location?: GooglePlaceInfo;
  avatarSrc?: string;
  skills?: string[];
  isWantSkills?: string[];
  isCanSkills?: string[];
  followings?: string[];
  tasks?: any;
  privateTasks?: string[];
  followers?: string[];
  invitedUsersFromMe?: string[];
  isVerify?: boolean;
  nominatedUser?: any;
  joinedAt?: Date;
  twitterNickname?: string;
  facebookNickname?: string;
  instagramNickname?: string;
  firebaseUid?: string;
}
