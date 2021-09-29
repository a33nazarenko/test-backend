import { Response, Request } from "express";
import { AuthServiceAPI } from "../../services/AuthService";

class AuthController {
    public verifyCode = async (req: Request, res: Response) => {
        try {
            const { phoneNumber, code } = req.body;
            const result = await AuthServiceAPI.verifyCode(phoneNumber, code);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send('Bad request');
        }
    }

    public sendCode = async (req: Request, res: Response) => {
        try {
            const { phoneNumber, channel } = req.body;
            const result = await AuthServiceAPI.sendCode(phoneNumber, channel);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send('Bad request');
        }
    }

}

export const AuthControllerAPI = new AuthController();