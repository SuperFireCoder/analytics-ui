export interface NewUsersTrend {
  labels: string[];
  data: number[];
  isReady: boolean;
}

export interface ILoginActivity {
  count: number[];
  time: string[];
}
export interface IAppActivity {
  clientId: string[];
  count: number[];
}

export interface ITrend {
  signup: NewUsersTrend;
  activity: ILoginActivity;
  appActivity: IAppActivity;
}
