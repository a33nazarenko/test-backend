import { UserModel } from '../../models/user/user.model';
import turf, { distance } from '@turf/turf';
import { User } from '../../models/user/types';
import {
  ETypeUsersForFind,
  FindPeopleDTO,
} from '../../models/findPeople/types';
import { TaskModel } from '../../models/task/task.model';
import { TaskDTO } from '../../models/task/types';

class FindPeopleService {
  private locationSearch = (
    users: User[],
    geoPoint: number[],
    radius: number,
    allLocation: boolean,
  ): User[] => {
    if (allLocation) return users;
    const filteredUsers = users.filter(u => {
      if (u.location) {
        const check = distance(geoPoint, [u.location.lng, u.location.lat], {
          units: 'miles',
        });
        return check > radius ? false : true;
      }
      return false;
    });
    return filteredUsers;
  };
  private getUsersOfType = async (
    users: User[],
    typeUsers: ETypeUsersForFind,
  ) => {
    if (typeUsers === ETypeUsersForFind.ALL) return users;
    const filteredUsers = users.filter(f => {
      const type = typeUsers === ETypeUsersForFind.CAN_HELP ? false : true;
      if (f.tasks) {
        return f.tasks[0].isWant === type;
      }
      return false;
    });
    return filteredUsers;
  };
  public findPeople = async (data: FindPeopleDTO) => {
    const users = await UserModel.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: data.valueSearchText } },
            { lastNane: { $regex: data.valueSearchText } },
            { userName: { $regex: data.valueSearchText } },
          ],
        },
      ],
    })
      .populate('tasks', 'isWant')
      .lean()
      .exec();
    const filteredLocation = this.locationSearch(
      users,
      data.geoPoint,
      data.radius,
      data.allLocation,
    );
    const filteredType = this.getUsersOfType(filteredLocation, data.typeUsers);
    return [];
  };
}

export const FindPeopleServiceAPI = new FindPeopleService();
