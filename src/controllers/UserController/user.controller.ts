import { Request, Response } from 'express';
import { User } from '../../models/user/types';
import { UserServiceAPI } from '../../services/UserService/user.service';

class UserController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const result = await UserServiceAPI.createUser(req.body as User);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Bad request');
    }
  };
  public getUser = async (req: Request, res: Response) => {
    try {
      const uid = req.query.id  as string;
      const result = await UserServiceAPI.getUser(uid);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Bad request');
    }
  };
  public updateUser = async (req: Request, res: Response) => {
    try {
      const result = await UserServiceAPI.updateUserProfile(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Bad request');
    }
  };
  public addInvitedUsers = async (req: Request, res: Response) => {
    try {
      const uid = req.query.uid as string;
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        res.status(500).send('Bad request');
        return;
      }
      await UserServiceAPI.addInvitedUsers(phoneNumber, uid);
      res.status(201).send('User was successfuly invited');
    } catch (error) {
      console.log(error);
    }
  };

  public getInvitedUsersForCheck = async (req: Request, res: Response) => {
    try {
      const result = await UserServiceAPI.getInvitedUsersForCheck();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Bad request');
    }
  };

  public getAllInvitedUsers = async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.body;
      const result = await UserServiceAPI.getAllInvitedUsers(phoneNumber);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Bad request');
    }
  };

  public addFollowing = async (req: Request, res: Response) => {
    try {
      const uid = req.query.uid as string;
      const followingId = req.query.followingId as string;
      const result = await UserServiceAPI.addFollowing(uid, followingId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Bad request');
    }
  };

  public removeFollowing = async (req: Request, res: Response) => {
    try {
      const uid = req.query.uid as string;
      const followingId = req.query.followingId as string;
      const result = await UserServiceAPI.removeFollowing(uid, followingId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Bad request');
    }
  };

  public addFollowings = async (req: Request, res: Response) => {
    try {
      // const uid = req.query.uid as string;
      const { followingIds, firebaseUid } = req.body;
      await UserServiceAPI.addFollowings(firebaseUid, followingIds);
      res.status(201).send('Followers added');
    } catch (error) {
      res.status(500).send('Bad request');
    }
  };
  public getFollowings = async (req: Request, res: Response) => {
    try {
      const { followingsIds } = req.body;
      const followings = await UserServiceAPI.getFollowings(followingsIds);
      res.status(200).json(followings);
    } catch (error) {
      console.log(error);
      res.status(500).send('Bad request');
    }
  };
}

export const UserControllerAPI = new UserController();
