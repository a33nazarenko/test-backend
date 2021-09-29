import { Request, Response } from 'express';
import { FeedbackDTO } from '../../models/feedback/types';
import { FeedbackServiceAPI } from '../../services/FeedbackService';

class FeedbackController {
  public getFeedbacks = async (req: Request, res: Response) => {
    try {
        const uid = req.query.uid as string;
        const result = await FeedbackServiceAPI.getFeedbacks(uid);
        res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };

  public setFeedback = async (req: Request, res: Response) => {
    try {
        const uid = req.query.uid as string;
        const { rating, feedbackUid, message, createdAt } = req.body;
        await FeedbackServiceAPI.setFeedback(uid, rating,
            feedbackUid,
            message,
            createdAt );
        res.status(201).send('Feedback was successfully added');
    } catch (error) {
        console.log(error)
    }
  }

}

export const FeedbackControllerAPI = new FeedbackController();
