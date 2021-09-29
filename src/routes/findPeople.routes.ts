import express from 'express';
import { FindPeopleControllerAPI } from '../controllers/FindPeopleController';

export const findPeopleRoutes = express.Router();

findPeopleRoutes.route('/findPeople').post(FindPeopleControllerAPI.findPeople);
