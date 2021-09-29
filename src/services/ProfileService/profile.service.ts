import { BlacklistModel } from '../../models/blacklist/blacklist.model';
import { User } from '../../models/user/types';
import { UserModel } from '../../models/user/user.model';

class ProfileService {
  public getFollowings = async (uid: string) => {
    const user = await UserModel.findOne({ uid }).lean();
    if (user?.followings?.length) {
      const users = await UserModel.find()
        .where('uid')
        .in(user?.followings as string[])
        .lean();
      return users;
    }
    return [];
  };

  public getFollowers = async (uid: string) => {
    const user = await UserModel.findOne({ uid }).lean();
    if (user?.followers?.length) {
      const users = await UserModel.find()
        .where('uid')
        .in(user?.followers as string[])
        .lean();
      return users;
    }
    return [];
  };

  public unfollowFollowing = async (uid: string, followId: string) => {
    await UserModel.updateOne(
      { uid },
      { $pull: { followings: followId } },
      { new: true, upsert: true },
    );
    await UserModel.updateOne(
      { uid: followId },
      { $pull: { followers: uid } },
      { new: true, upsert: true },
    );
  };

  public unfollowFollower = async (uid: string, followId: string) => {
    await UserModel.updateOne(
      { uid },
      { $pull: { followings: followId } },
      { new: true, upsert: true },
    );
    await UserModel.updateOne(
      { uid: followId },
      { $pull: { followers: uid } },
      { new: true, upsert: true },
    );
  };

  public removeFromBlackList = async (uid: string, blackUid: string) => {
    await BlacklistModel.updateOne(
      { uid },
      { $pull: { blackList: blackUid } },
      { new: true, upsert: true },
    );
  };

  public addToBlackList = async (uid: string, blackUid: string) => {
    await BlacklistModel.updateOne(
      { uid },
      { $push: { blackList: blackUid } },
      { new: true, upsert: true },
    );
    await UserModel.updateOne(
      { uid },
      { $pull: { followers: blackUid, followings: blackUid } },
      { new: true, upsert: true },
    );
    await UserModel.updateOne(
      { uid: blackUid },
      { $pull: { followers: uid, followings: uid } },
      { new: true, upsert: true },
    );
  };

  public getBlackList = async (uid: string) => {
    const data = await BlacklistModel.findOne({ uid }).lean();
    if (data?.blackList?.length) {
      const users = await UserModel.find()
        .where('uid')
        .in(data?.blackList as string[])
        .lean();
      return users;
    }
    return [];
  };

  public addSocialUsernames = async (
    uid: string,
    twitterNickname: string,
    instagramNickname: string,
  ) => {
    if (instagramNickname) {
      await UserModel.updateOne(
        { uid },
        {
          instagramNickname,
        },
      );
    }
    if (twitterNickname) {
      await UserModel.updateOne(
        { uid },
        {
          twitterNickname,
        },
      );
    }
  };

  public removeSocialUsernames = async (
    uid: string,
    twitterNickname: string,
    instagramNickname: string,
  ) => {
    if (instagramNickname) {
      await UserModel.updateOne(
        { uid },
        {
          instagramNickname: '',
        },
      );
    }
    if (twitterNickname) {
      await UserModel.updateOne(
        { uid },
        {
          twitterNickname: '',
        },
      );
    }
  };
}

export const ProfileServiceAPI = new ProfileService();
