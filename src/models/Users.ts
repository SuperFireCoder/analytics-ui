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

  //Load global status store for showing loading status

  constructor(
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    created: Date,
    provider?: string
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.created = created;
    this.provider = provider;
  }

  static getAllUsers = async (): Promise<IUsers[]> => {
    const store = useGlobalStore();
    const userStore = useUsersStore();
    store.setLoaderStatus({
      isLoading: true,
      text: 'Loading EcoCommons users',
    });
    return api
      .get('/users/all')
      .then((response) => {
        userStore.updateData(response.data);
        return response.data;
      })
      .finally(() => {
        store.setLoaderStatus({
          isLoading: false,
          text: 'Loading EcoCommons users',
        });
      });
  };
}
