import { Response, Request } from "express";
import { ProfileServiceAPI } from "../../services/ProfileService";

class ProfileController {

    public getFollowings = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const result = await ProfileServiceAPI.getFollowings(uid);
            res.status(200).json(result)
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public getFollowers = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const result = await ProfileServiceAPI.getFollowers(uid);
            res.status(200).json(result)
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public unfollowFollowing = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const followId = req.query.followId as string;
            await ProfileServiceAPI.unfollowFollowing(uid, followId)
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public unfollowFollower = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const followId = req.query.followId as string;
            await ProfileServiceAPI.unfollowFollower(uid, followId)
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public removeFromBlackList = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const blackUid = req.query.blackUid as string;
            await ProfileServiceAPI.removeFromBlackList(uid, blackUid);
            res.status(201).send('User was successfuly removed from blacklist')
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public addToBlackList = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const blackUid = req.query.blackUid as string;
            await ProfileServiceAPI.addToBlackList(uid, blackUid)
            res.status(201).send('User was successfuly added to blacklist')
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public getBlackList = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const result = await ProfileServiceAPI.getBlackList(uid);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public removeSocialUsernames = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const { twitterNickname, instagramNickname} = req.body;
            await ProfileServiceAPI.removeSocialUsernames(uid, twitterNickname, instagramNickname);
            res.status(201).send('Social was successfuly removed');
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }

    public addSocialUsernames = async (req: Request, res: Response) => {
        try {
            const uid = req.query.uid as string;
            const { twitterNickname, instagramNickname} = req.body;
            await ProfileServiceAPI.addSocialUsernames(uid, twitterNickname, instagramNickname);
            res.status(201).send('Social was successfuly added');
        } catch (error) {
            res.status(500).send('Bad request')
        }
    }
}

export const ProfileControllerAPI = new ProfileController();