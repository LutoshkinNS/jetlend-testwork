export interface TaskEntry {
  id: number;
  name: string;
  estimate: number;
}

export interface ProjectEstimate {
  id: number;
  name: string;
  total_estimate: number;
  tasks: TaskEntry[];
}

export interface UserEstimate {
  id: number | null;
  name: string;
  total_estimate: number;
  projects_estimates: ProjectEstimate[];
}
