import type { UserEstimate } from "./types.ts";
import { transformDataToUserTasks } from "./transformDataToUserTasks.ts";
import { fetchProjects, fetchTasks, fetchUsers } from "@/common/api/api.ts";

export async function fetchUserTasks(
  signal: AbortSignal,
): Promise<UserEstimate[]> {
  const [projects, users, tasks] = await Promise.all([
    fetchProjects(signal),
    fetchUsers(signal),
    fetchTasks(signal),
  ]);
  return transformDataToUserTasks(users.data, projects.data, tasks.data);
}
