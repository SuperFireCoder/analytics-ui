export default interface IUsers {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  provider?: string;
  created: Date;
}
