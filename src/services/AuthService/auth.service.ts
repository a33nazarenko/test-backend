import { Request } from 'express';
import { UserModel } from '../../models/user/user.model';
import {client} from '../../app'

class AuthService {

  public login = async () => {
    const newUser = new UserModel();
    const response = await newUser.save();
    return response;
  };

  public logOut = async (req: Request) => {
    await UserModel.findByIdAndDelete(req.body._id);
  };

  public sendCode = async (phoneNumber: string, channel: string) => {

        const result = await client
              .verify
              .services(`${process.env.TWILIO_VERIFICATION_SID}`)
              .verifications
              .create({
                  to: `+${phoneNumber}`,
                  channel: channel
              });
              return result;
};

public verifyCode = async (phoneNumber: string, code: string) => {
  const result = await client
        .verify
        .services(`${process.env.TWILIO_VERIFICATION_SID}`)
        .verificationChecks
        .create({
            to: `+${phoneNumber}`,
            code: code
        })
        return result;
  };
};

export const AuthServiceAPI = new AuthService();
