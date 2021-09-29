import express from 'express';
import { TaskControllerAPI } from '../controllers/TaskController';

export const taskRoutes = express.Router();

taskRoutes.route('/createTask').post(TaskControllerAPI.createTask);
taskRoutes.route('/getTask').get(TaskControllerAPI.getTask);
taskRoutes.route('/getFeedTasks').get(TaskControllerAPI.getTasksFeed);
taskRoutes.route('/getHistoryTasks').get(TaskControllerAPI.getTasksHistory);
