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
import {ObjectId}  from 'mongodb';

class TaskService {
  private sortTime = (data: Task[]): Task[] => {
    return data.sort((a, b) => {
      const B = b.createdTime.getDate();
      const A = a.createdTime.getDate();
      return B - A;
    });
  };
  private getUserToTask = async (tasks: TaskDTO[]): Promise<Task[]> => {
    const userIds = tasks.map(item => item.uid);
    const uniqIds = Array.from(new Set(userIds));
    if (!uniqIds.length) return [];
    const users = await UserModel.find().where('_id').in(uniqIds).lean().exec();
    const newTasks: Task[] = tasks.map(item => {
      const findCurrentUser = users.find(f => {
        return f._id.equals(item.uid)
      }) as User;
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
    const task = await TaskModel.findOne({ _id: id }).populate(uid).lean();
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
      userIds: uid ? uid.toString() : [],
      type: +type,
      acceptedFromExecutor: false
    }).lean() as TaskDTO[];
    const selectedTasks = tasks.filter(item => item.uid.toString() !== uid.toString());
    const mapTasks = await this.getUserToTask(selectedTasks);
    return this.sortTime(mapTasks).filter(item => !item.respondIds?.includes(uid.toString()));
  };

  public getTasksHistory = async (
    uid: mongoose.Types.ObjectId,
    isDone: boolean,
    type: string,
  ) => {
    let mapTasks: Task[] = [];
    if (type !== '1') {
      const tasks = await TaskModel.find({
        respondIds: uid.toString(),
        isDone,
      }).lean() as TaskDTO[];
      mapTasks = await this.getUserToTask(tasks);
      return this.sortTime(mapTasks);
    }
    const tasksCreated = await TaskModel.find({
      uid
    }).lean() as TaskDTO[];
    mapTasks = await this.getUserToTask(tasksCreated);
    return this.sortTime(mapTasks);
  };
}

export const TaskServiceAPI = new TaskService();
