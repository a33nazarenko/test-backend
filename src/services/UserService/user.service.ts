import { BlacklistModel } from '../../models/blacklist/blacklist.model';
import { FeedbackModel } from '../../models/feedback/feedback.model';
import { InvitedUserModel } from '../../models/invitedUser/invitedUser.model';
import { User } from '../../models/user/types';
import { UserModel } from '../../models/user/user.model';

class UserService {
  public compareUserAndNominatedUser = async (data: User) => {
    const nominatedUser = await UserModel.findById(data.nominatedUser);
    const updateUser = {
      ...data,
      nominatedUser: {
        avatarSrc: nominatedUser?.avatarSrc,
        firstName: nominatedUser?.firstName,
        lastName: nominatedUser?.lastName,
        _id: nominatedUser?._id,
      },
    };
    return updateUser;
  };
  public createUser = async (data: User) => {
    const isUser = await UserModel.findOne({
      id: data._id,
    })
      .lean()
      .exec();
    if (isUser) return;

    // Rework This Code //
    const invitedUser = await InvitedUserModel.find().lean();
    let currentPhone = '';
    invitedUser.forEach(p => {
      if (data.phoneNumber.includes(p.phoneNumber)) {
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
    // invitedFromMe.forEach(item => {
    // 	let user = item.data() as User;
    // 	nominatedUser = user.uid as string;
    // });
    const userModel = new UserModel({
      phoneNumber: data.phoneNumber,
      isVerify: true,
      nominatedUser,
      joinedAt: new Date(),
      isWantSkills: [],
      isCanSkills: [],
      avatarSrc: '',
      followers: [],
    });
    const newUser = await userModel.save();
    const feedbackModel = new FeedbackModel({
      uid: newUser._id,
      feedbacks: [],
    });
    const blackListModel = new BlacklistModel({
      uid: newUser._id,
      blackList: [],
    });
    await blackListModel.save();
    await feedbackModel.save();
    await UserModel.findByIdAndUpdate(nominatedUser, {
      $push: {
        followers: newUser._id,
        followings: newUser._id,
      },
    });
    return {
      uid: newUser._id,
      nominatedUid: invitedForMe?.firebaseUid,
    };
    // const blackListModel = new BlackList
    // await firestore()
    // 	.collection('BlackList')
    // 	.doc(user?.uid)
    // 	.set({ blackList: [] });
    // const regex = new RegExp(data.phoneNumber, 'i');
    // const invitedUsers = await InvitedUserModel.findOne({
    //   $match: {
    //     phoneNumber: {
    //       $regex: data.phoneNumber,
    //       $options: 'i',
    //     },
    //   },
    // })
    //   .lean()
    //   .exec();
    // console.log(invitedUsers);
    // const
  };
  public getUser = async (uid: string) => {
    const result = await UserModel.findById(uid).lean().exec();
    return await this.compareUserAndNominatedUser(result as User);
  };

  public updateUserProfile = async (data: any) => {
    if (data) {
      const user = await UserModel.findByIdAndUpdate(
        data._id,
        {
          ...data,
        },
        {
          new: true,
        },
      ).lean();
      return await this.compareUserAndNominatedUser(user as User);
    }
    return;
  };

  public addInvitedUsers = async (phoneNumber: string, uid: string) => {
    const newInvite = new InvitedUserModel({
      phoneNumber,
    });
    await newInvite.save();
    await UserModel.findOneAndUpdate(
      { uid },
      { $push: { invitedUsersFromMe: phoneNumber } },
      { new: true, upsert: true },
    );
  };

  public getInvitedUsersForCheck = async () => {
    const result = await InvitedUserModel.find().lean();
    return result;
  };

  public getAllInvitedUsers = async (phoneNumber: string) => {
    const invitedUsers = await InvitedUserModel.find().lean();
    let currentPhone = '';
    invitedUsers.forEach(data => {
      if (phoneNumber.includes(data.phoneNumber)) {
        currentPhone = data.phoneNumber;
        return;
      }
    });
    const invitedFromMe = await UserModel.find({
      invitedUsersFromMe: currentPhone,
    }).lean();
    let nominatedUser: any;
    invitedFromMe.forEach(item => {
      nominatedUser = item._id;
    });
    const isNominated = !!nominatedUser!;

    return currentPhone && isNominated;
  };

  public addFollowing = async (uid: string, followingId: string) => {
    await UserModel.findByIdAndUpdate(
      uid,
      { $push: { followings: followingId } },
      { new: true, upsert: true },
    );
    await UserModel.findByIdAndUpdate(
      followingId,
      { $push: { followers: uid } },
      { new: true, upsert: true },
    );

    const userDb = await UserModel.findOne({ uid: followingId }).lean();
    return this.compareUserAndNominatedUser(userDb as User);
  };

  public removeFollowing = async (uid: string, followingId: string) => {
    await UserModel.findOneAndUpdate(
      { uid },
      { $pull: { followings: followingId } },
      { new: true, upsert: true },
    );
    await UserModel.findOneAndUpdate(
      { uid: followingId },
      { $pull: { followers: uid } },
      { new: true, upsert: true },
    );

    const userDb = await UserModel.findOne({ uid: followingId }).lean();
    if (userDb?.nominatedUser) {
      const nominatedUser = await UserModel.findOne({
        uid: userDb?.nominatedUser,
      });
      const currentUser = {
        ...userDb,
        nominatedUser: {
          avatarSrc: nominatedUser?.avatarSrc,
          firstName: nominatedUser?.firstName,
          lastName: nominatedUser?.lastName,
          uid: nominatedUser?.uid,
        },
      };
      return currentUser;
    }
    return userDb;
  };

  public addFollowings = async (_id: string, followingIds: string[]) => {
    await UserModel.updateOne(
      { id: _id },
      {
        followings: followingIds,
      },
    );

    followingIds.forEach(async item => {
      await UserModel.updateOne(
        { _id: item },
        { $push: { followers: _id } },
        { new: true, upsert: true },
      );
    });
  };
  public getFollowings = async (followingsIds: string[]) => {
    const folllowings = await UserModel.find()
      .where('_id')
      .in(followingsIds as string[])
      .lean();
    return folllowings;
  };
}

export const UserServiceAPI = new UserService();
