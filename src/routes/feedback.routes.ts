import express from 'express';
import { FeedbackControllerAPI } from '../controllers/FeedbackController';

export const feedbackRoutes = express.Router();

feedbackRoutes.route('/getFeedbacks').get(FeedbackControllerAPI.getFeedbacks);
feedbackRoutes.route('/setFeedback').post(FeedbackControllerAPI.setFeedback);