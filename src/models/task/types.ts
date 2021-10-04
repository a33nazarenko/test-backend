import mongoose from 'mongoose';

export enum ETypeTask {
  GLOBAL = 1,
  PRIVATE = 2,
  PUBLIC = 3,
}

export enum ETypeTasksHistory {
  CREATED = 1,
  TAKEN = 2,
  FINISHED = 3,
}

export enum ETaskStatus {
  NOT_RESPONDED = 1,
  RESPONDED = 2,
  IN_PROGRESS = 3,
  DECLINED = 4,
  FINISHED = 5,
}
export interface GooglePlaceInfo {
  name: string;
  lat: number;
  lng: number;
}

export interface TaskDTO {
  // userName: string;
  // userLocation: GooglePlaceInfo;
  // userAvatarSrc: string;


  // createdTime: Date;
  // name: string;
  // categories: string[];
  // address: GooglePlaceInfo;
  // remote: boolean;
  // fromTime?: any;
  // toTime?: any;
  // startDate?: Date | null;
  // endDate?: Date | null;
  // workDays?: boolean;
  // weekends?: boolean;
  // price: number;
  // priceType: string;
  // description?: string;
  // type: ETypeTask;
  // uid: mongoose.Types.ObjectId;
  // isWant: boolean;
  // userIds?: mongoose.Types.ObjectId[];
  // respondIds?: string[];
  // taskStatus: ETaskStatus;
  // acceptedFromCustomer: boolean;
  // acceptedFromExecutor: boolean;
  // isDoneFromExecutor: boolean;
  // isDoneFromCustomer: boolean;
  // isDone?: boolean;
  // id?: string;

  createdTime: Date;
  name: string;
  categories: string[];
  address: GooglePlaceInfo;
  remote: boolean;
  calendarRangeStartDate?: Date| null;
  calendarRangeEndDate?: Date | null;
  starts?: Date | null;
  ends?: Date | null;
  nowDate?: Date | null;
  todayStarts?: Date | null;
  todayEnds?: Date | null;
  todayDate?: Date | null;
  price: string;
  priceType: string;
  description?: string;
  type: ETypeTask;
  uid: mongoose.Types.ObjectId;
  isWant: boolean;
  userIds?: string[];
  respondIds?: string[];
  taskStatus: ETaskStatus;
  acceptedFromCustomer: boolean;
  acceptedFromExecutor: boolean;
  isDoneFromExecutor: boolean;
  isDoneFromCustomer: boolean;
  isDone?: boolean;
  id?: string;
  taskDays?: string[];
}
export interface Task extends TaskDTO {
  userName: string;
  userLocation: GooglePlaceInfo;
  userAvatarSrc: string;
}
