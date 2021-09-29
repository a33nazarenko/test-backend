import { GooglePlaceInfo } from '../task/types';
export enum ETypeUsersForFind {
  ALL = 0,
  NEED_HELP = 1,
  CAN_HELP = 2,
}
export interface FindPeopleDTO {
  valueSearchText: string;
  allLocation: boolean;
  geoPoint: number[];
  typeUsers: ETypeUsersForFind;
  radius: number;
}
