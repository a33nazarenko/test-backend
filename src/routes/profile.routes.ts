import express from 'express';
import { ProfileControllerAPI } from '../controllers/ProfileController';

export const profileRoutes = express.Router();

profileRoutes.route('/getFollowings').get(ProfileControllerAPI.getFollowings);
profileRoutes.route('/getFollowers').get(ProfileControllerAPI.getFollowers);
profileRoutes.route('/unfollowFollower').post(ProfileControllerAPI.unfollowFollower);
profileRoutes.route('/unfollowFollowing').post(ProfileControllerAPI.unfollowFollowing);
profileRoutes.route('/removeFromBlackList').post(ProfileControllerAPI.removeFromBlackList);
profileRoutes.route('/addToBlackList').post(ProfileControllerAPI.addToBlackList);
profileRoutes.route('/getBlackList').get(ProfileControllerAPI.getBlackList);
profileRoutes.route('/addSocialUsernames').post(ProfileControllerAPI.addSocialUsernames);
profileRoutes.route('/removeSocialUsernames').post(ProfileControllerAPI.removeSocialUsernames);