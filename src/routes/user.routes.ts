import express from 'express';
import { UserControllerAPI } from '../controllers/UserController';
import { UserServiceAPI } from '../services/UserService';

export const userRoutes = express.Router();

userRoutes.route('/createUser').post(UserControllerAPI.createUser);
userRoutes.route('/getUser').get(UserControllerAPI.getUser);
userRoutes.route('/updateUser').put(UserControllerAPI.updateUser);
userRoutes.route('/addInvitedUsers').post(UserControllerAPI.addInvitedUsers);
userRoutes
  .route('/getInvitedUsersForCheck')
  .get(UserControllerAPI.getInvitedUsersForCheck);
userRoutes
  .route('/getAllInvitedUsers')
  .post(UserControllerAPI.getAllInvitedUsers);
userRoutes.route('/addFollowing').post(UserControllerAPI.addFollowing);
userRoutes.route('/removeFollowing').post(UserControllerAPI.removeFollowing);
userRoutes.route('/addFollowings').post(UserControllerAPI.addFollowings);
userRoutes.route('/getFollowings').post(UserControllerAPI.getFollowings);
