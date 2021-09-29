import { Response, Request } from 'express';
import { AuthServiceAPI } from '../../services/AuthService';

class AuthController {
  public verifyCode = async (req: Request, res: Response) => {
    try {
      const { phoneNumber, code } = req.body;
      const result = await AuthServiceAPI.verifyCode(phoneNumber, code);
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  public sendCode = async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.body;
      await AuthServiceAPI.sendCode(phoneNumber);
      res.status(200).json({ sentCode: true });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}

export const AuthControllerAPI = new AuthController();
