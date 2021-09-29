import { Request, Response } from 'express';
import { TaskDTO } from '../../models/task/types';
import { TaskServiceAPI } from '../../services/TaskService';
import mongoose from 'mongoose';

class TaskController {
  public createTask = async (req: Request, res: Response) => {
    try {
      const id = await TaskServiceAPI.createTask(req.body as TaskDTO);
      res.status(200).json({ id });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'error' });
    }
  };
  public getTask = async (req: Request, res: Response) => {
    try {
      const result = await TaskServiceAPI.getTask(
        req.query.id as string,
        req.query.uid as any,
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };
  public getTasksFeed = async (req: Request, res: Response) => {
    try {
      const uid = req.query.uid as any;
      const type = req.query.type as string;
      const result = await TaskServiceAPI.getTasksFeed(uid, type);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };
  public getTasksHistory = async (req: Request, res: Response) => {
    try {
      const uid = req.query.uid as string;
      const isDone = (req.query.isDone as string) === '0' ? false : true;
      const isCreated = (req.query.isCreated as string) === '0' ? false : true;
      const result = await TaskServiceAPI.getTasksHistory(
        uid,
        isDone,
        isCreated,
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };
}

export const TaskControllerAPI = new TaskController();
