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
    return api.get('/users/all').then((response) => {
      return response.data;
    });
  };
}
