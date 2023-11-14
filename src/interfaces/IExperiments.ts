export interface IExperiment {
  uuid: string;
  title: string;
  description: string;
  jobType: string;
  functions: string;
  parameters: string;
  owner: string;
  status: string;
  metadata: string;
  acl: string;
  created: string
  profile: string;
  version: string;
  isSynced: boolean;
}
export interface IExperimentStatusItem {
  name: string
  total: number
}
export interface IExperimentByTypeItem {
  name: string
  status: IExperimentStatusItem[]
}

export enum ExperimentStatus {
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN-PROGRESS',
  CREATED = 'CREATED',
  FINISHED = 'FINISHED'
}
export enum AlgorithmSourceType {
  EC = 'EcoCommons',
  BSC = 'Biosecurity',
}
// For statuses with number values
type StatusCount = Record<ExperimentStatus, number>;

// For algorithm names with StatusCount values
type AlgorithmData = Record<string, StatusCount>;

// For source types with AlgorithmData values
type AlgorithmsByTypeStatus = Record<AlgorithmSourceType, AlgorithmData>;


export interface IExperimentAnalytics {
  experimentsByType: IExperimentStatusItem[]
  algorithmsByTypeStatus: AlgorithmsByTypeStatus
  experimentsByStatus: Record<ExperimentStatus, number>
  experimentsByTypeStatus: IExperimentByTypeItem[]


}
