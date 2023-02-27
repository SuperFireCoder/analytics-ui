export default interface IUsers {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  provider?: string;
  orginizationName: string;
  orginizationSector: string;
  created: Date;
}
export interface UserDataBySector {
  orginizationSector: string;
  name: string;
  value: number;
}
export interface AllUserResponse {
  users: IUsers[];
  userGrouped: UserDataBySector[];
}
