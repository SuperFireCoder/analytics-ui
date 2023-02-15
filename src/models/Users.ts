import { NewUsersTrend } from './../interfaces/ICharts';
import { useUsersStore } from './../stores/users-store';
import { useGlobalStore } from './../stores/global-store';
import IUsers from 'src/interfaces/IUser';
import { api } from 'src/boot/axios';

export default class Users implements IUsers {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  provider?: string | undefined;
  created: Date;

  userStore = useUsersStore();
  //Load global status store for showing loading status

  constructor(user?: IUsers) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.created = user.created;
      this.provider = user.provider;
    } else {
      this.id =
        this.username =
        this.firstName =
        this.lastName =
        this.email =
        this.provider =
          '';
      this.created = new Date();
    }
  }

  getAllUsers = async (): Promise<void> => {
    return api.get('/users/all').then((response) => {
      this.userStore.updateData(response.data);
    });
  };
  getNewUserTrendData = async (): Promise<void> => {
    return api.get('/users/trend').then((response) => {
      const storeData = response.data;
      storeData.isReady = true;
      this.userStore.updateNewUserTrendData(storeData);
    });
  };
}
