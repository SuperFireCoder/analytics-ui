import { useUsersStore } from './../stores/users-store';
import IUsers from 'src/interfaces/IUser';
import { api } from 'src/boot/keycloak';

export default class Users implements IUsers {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  provider?: string | undefined;
  created: Date;
  orginizationName: string;
  orginizationSector: string;
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
      this.orginizationName = user.orginizationName;
      this.orginizationSector = user.orginizationSector;
    } else {
      this.id =
        this.username =
        this.firstName =
        this.lastName =
        this.email =
        this.provider =
        this.orginizationName =
        this.orginizationSector =
          '';
      this.created = new Date();
    }
  }

  getUsersData = async (): Promise<void> => {
    return api.get('/users/all').then((response) => {
      this.userStore.updateData(response.data);
    });
  };
}
