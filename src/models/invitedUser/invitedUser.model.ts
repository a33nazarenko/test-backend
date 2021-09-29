import mongoose from 'mongoose';
import { InvitedUser } from './types';
const { Schema } = mongoose;

type InvitedUserModelType = InvitedUser & Document;

const invitedUserSchema = new Schema<InvitedUserModelType>({
    phoneNumber: String
});

export const InvitedUserModel = mongoose.model<InvitedUserModelType>('InvitedUsers', invitedUserSchema);
