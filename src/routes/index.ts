import express from 'express';
import { taskRoutes } from './task.routes';
import { feedbackRoutes } from './feedback.routes';
import { userRoutes } from './user.routes';
import { profileRoutes } from './profile.routes';
import { findPeopleRoutes } from './findPeople.routes';
import { authRoutes } from './auth.routes';

const router = express.Router();

router.use('/task', taskRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/find', findPeopleRoutes);
router.use('/auth', authRoutes)

export default router;
