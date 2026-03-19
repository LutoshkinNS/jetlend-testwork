import type { ProjectEstimate, UserEstimate } from "./types.ts";
import type { ProjectDto, UserDto, TaskDto } from "@/common/api/types.ts";

export function transformDataToUserTasks(
  users: UserDto[],
  projects: ProjectDto[],
  tasks: TaskDto[],
): UserEstimate[] {
  const hasUnassigned = tasks.some((t) => t.responsible_id === null);

  const allUsers: Array<UserDto | { id: null; name: string }> = [...users];

  if (hasUnassigned) {
    allUsers.push({ id: null, name: "Без исполнителя" });
  }

  const result: UserEstimate[] = [];

  allUsers.forEach((user) => {
    const userTasks = tasks.filter((task) => task.responsible_id === user.id);
    if (userTasks.length === 0) return;

    const totalEstimate = userTasks.reduce(
      (sum, task) => sum + task.estimate,
      0,
    );

    const userProjects: ProjectEstimate[] = projects.map((project) => {
      const userProjectTasks = userTasks.filter(
        (task) => task.project_id === project.id,
      );

      const projectEstimate = userProjectTasks.reduce(
        (sum, task) => sum + task.estimate,
        0,
      );

      const projectTasksEntry = userProjectTasks.map((task) => ({
        id: task.id,
        name: task.name,
        estimate: task.estimate,
      }));

      return {
        id: project.id,
        name: project.name,
        total_estimate: projectEstimate,
        tasks: projectTasksEntry,
      };
    });

    result.push({
      id: user.id,
      name: user.name,
      total_estimate: totalEstimate,
      projects_estimates: userProjects,
    });
  });

  return result;
}
