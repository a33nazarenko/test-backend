import { Request, Response } from 'express';
import { FindPeopleServiceAPI } from '../../services/FindPeopleService/findPeople.service';

class FindPeopleController {
  public findPeople = async (req: Request, res: Response) => {
    try {
      const result = await FindPeopleServiceAPI.findPeople(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };
}

export const FindPeopleControllerAPI = new FindPeopleController();
