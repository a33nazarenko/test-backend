import mongoose from 'mongoose';
import { TaskModel } from '../../models/task/task.model';
import {
  ETypeTask,
  GooglePlaceInfo,
  Task,
  TaskDTO,
} from '../../models/task/types';
import { User } from '../../models/user/types';
import { UserModel } from '../../models/user/user.model';

class TaskService {
  private sortTime = (data: Task[]): Task[] => {
    return data.sort((a, b) => {
      const B = b.createdTime.getDate();
      const A = a.createdTime.getDate();
      return B - A;
    });
  };
  private getUserToTask = async (tasks: TaskDTO[]): Promise<Task[]> => {
    const userIds = tasks.map(item => item.id);
    const uniqIds = Array.from(new Set(userIds));
    if (!uniqIds.length) return [];
    const users = await UserModel.find().where('_id').in(uniqIds).lean();
    const newTasks: Task[] = tasks.map(item => {
      const findCurrentUser = users.find(f => f._id === item.uid) as User;
      return {
        ...item,
        userAvatarSrc: findCurrentUser.avatarSrc
          ? findCurrentUser.avatarSrc
          : '',
        userLocation: findCurrentUser.location as GooglePlaceInfo,
        userName: `${findCurrentUser.firstName as string} ${
          findCurrentUser.lastName as string
        }`,
        id: item.id as string,
      };
    });
    return newTasks;
  };
  public createTask = async (task: TaskDTO) => {
    const model = new TaskModel(task);
    const newTask = await model.save();
    const user = await UserModel.findByIdAndUpdate(task.uid, {
      $push: {
        tasks: newTask._id,
      },
    });
    TaskModel.findByIdAndUpdate(newTask._id, { uid: user?._id });
    return newTask._id;
  };
  public getTask = async (id: string, uid: mongoose.Types.ObjectId) => {
    const task = await TaskModel.findOne({ id }).populate('uid').lean();
    const user = await UserModel.findOne({ _id: task?.uid }).lean();
    let users: User[] = [];
    if (task?.uid === uid && task.respondIds?.length) {
      users = await UserModel.find()
        .where('uid')
        .in(task?.respondIds as string[])
        .lean();
    }
    return {
      task: {
        ...task,
        userAvatarSrc: user?.avatarSrc ? user?.avatarSrc : '',
        userLocation: user?.location as GooglePlaceInfo,
        userName: `${user?.firstName as string} ${user?.lastName as string}`,
      },
      users,
    };
  };
  public getTasksFeed = async (uid: mongoose.Types.ObjectId, type: string) => {
    const tasks = await TaskModel.find({
      userIds: uid,
      type: +type,
      acceptedFromExecutor: false,
    }).lean();
    const mapTasks = await this.getUserToTask(tasks);
    return this.sortTime(mapTasks).filter(item => item.uid !== uid);
  };
  public getTasksHistory = async (
    uid: string,
    isDone: boolean,
    isCreated: boolean,
  ) => {
    let mapTasks: Task[] = [];
    if (!isCreated) {
      const tasks = await TaskModel.find({
        respondIds: uid,
        isDone,
      }).lean();
      mapTasks = await this.getUserToTask(tasks);
      return mapTasks;
    }
    const tasksCreated = await TaskModel.find({
      uid,
    }).lean();
    mapTasks = await this.getUserToTask(tasksCreated);
    return mapTasks;
  };
}

export const TaskServiceAPI = new TaskService();
