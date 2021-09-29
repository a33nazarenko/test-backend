import { Response, Request } from "express";
import { AuthServiceAPI } from "../../services/AuthService";

class AuthController {
    public verifyCode = async (req: Request, res: Response) => {
        try {
            const { phoneNumber, code } = req.body;
            const result = await AuthServiceAPI.verifyCode(phoneNumber, code);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message);
        }
    }

    public sendCode = async (req: Request, res: Response) => {
        try {
            const { phoneNumber, channel } = req.body;
            await AuthServiceAPI.sendCode(phoneNumber, channel);
            res.status(200).json({ sentCode: true });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

}

export const AuthControllerAPI = new AuthController();