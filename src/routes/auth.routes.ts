import express from 'express';
import { AuthControllerAPI } from '../controllers/AuthController/auth.controller';

export const authRoutes = express.Router();

authRoutes.route('/sendCode').post(AuthControllerAPI.sendCode);
authRoutes.route('/verifyCode').post(AuthControllerAPI.verifyCode);
authRoutes.route('/getUserToFollow').get(AuthControllerAPI.getUserToFollow);