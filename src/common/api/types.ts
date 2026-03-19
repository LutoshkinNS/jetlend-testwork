export interface ApiResponse<T> {
  status: string;
  data: T[];
}

export interface ProjectDto {
  id: number;
  name: string;
  code: string;
}

export interface UserDto {
  id: number;
  name: string;
}

export interface TaskDto {
  id: number;
  name: string;
  project_id: number;
  estimate: number;
  responsible_id: number | null;
}
