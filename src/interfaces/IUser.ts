import { ISignUpActivity, ILoginActivity, IAppActivity } from './ICharts';

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
export interface IUserDataBySector {
  orginizationSector: string;
  name: string;
  value: number;
}
export interface IUserDataResponse {
  users: IUsers[];
  userGrouped: IUserDataBySector[];
  signup: ISignUpActivity;
  activity: ILoginActivity;
  appActivity: IAppActivity[];
}
