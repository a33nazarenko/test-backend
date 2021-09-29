import { FeedbackModel } from '../../models/feedback/feedback.model';

class FeedbackService {
  public getFeedbacks = async (uid: string) => {
    const result = await FeedbackModel.findOne({ uid }).lean();
    return result?.feedbacks;
  };

  public setFeedback = async (
    uid: string,
    rating: number,
    feedbackUid: string,
    message: string,
    createdAt: Date,
  ) => {
    await FeedbackModel.findOneAndUpdate(
      { uid },
      {
        $push: {
          feedbacks: {
            rating,
            feedbackUid,
            message,
            createdAt,
          },
        },
      },
      { new: true, upsert: true },
    );
  };
}

export const FeedbackServiceAPI = new FeedbackService();
