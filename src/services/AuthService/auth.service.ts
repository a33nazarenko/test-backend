import { Request } from 'express';
import { UserModel } from '../../models/user/user.model';
import { client } from '../../app';
import { UserServiceAPI } from '../UserService';
import { InvitedUserModel } from '../../models/invitedUser/invitedUser.model';

class AuthService {
  public login = async () => {
    const newUser = new UserModel();
    const response = await newUser.save();
    return response;
  };

  // public logOut = async (req: Request) => {
  //   await UserModel.findByIdAndDelete(req.body._id);
  // };

  private checkForUser = async (phoneNumber: string) => {
    const user = await UserModel.findOne({ phoneNumber }).lean().exec();
    if (user) return user;
    const invitedUser = await InvitedUserModel.find().lean();
    let currentPhone = '';
    invitedUser.forEach(p => {
      if (phoneNumber.includes(p.phoneNumber)) {
        currentPhone = p.phoneNumber;
        return;
      }
    });
    const invitedForMe = await UserModel.findOne({
      invitedUsersFromMe: currentPhone,
    })
      .lean()
      .exec();
    const nominatedUser = invitedForMe?._id;
    const userModel = new UserModel({
      phoneNumber,
      isVerify: true,
      nominatedUser,
      joinedAt: new Date(),
      isWantSkills: [],
      isCanSkills: [],
      avatarSrc: '',
      followers: [],
    });
    const newUser = await userModel.save();
    await UserModel.findByIdAndUpdate(nominatedUser, {
      $push: {
        followers: newUser._id,
        followings: newUser._id,
      },
    });
    return newUser;
  };

  public sendCode = async (phoneNumber: string) => {
    const invitedUser = await InvitedUserModel.find().lean();
    let currentPhone = '';
    invitedUser.forEach(p => {
      if (phoneNumber.includes(p.phoneNumber)) {
        currentPhone = p.phoneNumber;
        return;
      }
    });
    if (currentPhone === '') {
      throw new Error('Went wrong!');
    }
    await client.verify
      .services(`${process.env.TWILIO_VERIFICATION_SID}`)
      .verifications.create({
        to: `${phoneNumber}`,
        channel: 'sms',
      });
  };

  public verifyCode = async (phoneNumber: string, code: string) => {
    const result = await client.verify
      .services(`${process.env.TWILIO_VERIFICATION_SID}`)
      .verificationChecks.create({
        to: `${phoneNumber}`,
        code,
      });
    if (result.valid) {
      return this.checkForUser(phoneNumber);
    }
    throw new Error('Code is not valid! Try Again');
  };
}

export const AuthServiceAPI = new AuthService();
