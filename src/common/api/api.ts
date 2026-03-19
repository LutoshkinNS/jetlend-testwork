import type { ApiResponse, ProjectDto, TaskDto, UserDto } from "./types.ts";

const API_PATH = "/media/files/hr/frontend";
const API_DOMAIN = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "";

export function fetchProjects(
  signal: AbortSignal,
): Promise<ApiResponse<ProjectDto>> {
  return fetch(`${API_DOMAIN}${API_PATH}/projects.json`, { signal }).then((r) =>
    r.json(),
  );
}

export function fetchUsers(signal: AbortSignal): Promise<ApiResponse<UserDto>> {
  return fetch(`${API_DOMAIN}${API_PATH}/users.json`, { signal }).then((r) =>
    r.json(),
  );
}

export function fetchTasks(signal: AbortSignal): Promise<ApiResponse<TaskDto>> {
  return fetch(`${API_DOMAIN}${API_PATH}/tasks.json`, { signal }).then((r) =>
    r.json(),
  );
}
