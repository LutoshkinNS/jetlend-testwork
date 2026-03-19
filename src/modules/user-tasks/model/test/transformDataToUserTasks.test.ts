import { describe, expect, it } from "vitest";
import { transformDataToUserTasks } from "../transformDataToUserTasks.ts";
import type { ProjectDto, UserDto, TaskDto } from "@/common/api/types.ts";

const projects: ProjectDto[] = [
  { id: 1, name: "Alpha", code: "ALF" },
  { id: 2, name: "Beta", code: "BET" },
];

const users: UserDto[] = [
  { id: 10, name: "Alice" },
  { id: 20, name: "Bob" },
];

describe("transformDataToUserTasks", () => {
  it("возвращает пустой массив для пустых входных данных", () => {
    expect(transformDataToUserTasks([], [], [])).toEqual([]);
  });

  it("возвращает пустой массив если есть пользователи но нет задач", () => {
    expect(transformDataToUserTasks(users, projects, [])).toEqual([]);
  });

  it("назначает задачу с responsible_id: null на «Без исполнителя»", () => {
    const tasks: TaskDto[] = [
      { id: 1, name: "T1", project_id: 1, estimate: 5, responsible_id: null },
    ];
    const result = transformDataToUserTasks(users, projects, tasks);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Без исполнителя");
    expect(result[0].total_estimate).toBe(5);
  });

  it("считает total_estimate пользователя как сумму всех его задач", () => {
    const tasks: TaskDto[] = [
      { id: 1, name: "T1", project_id: 1, estimate: 3, responsible_id: 10 },
      { id: 2, name: "T2", project_id: 2, estimate: 7, responsible_id: 10 },
    ];
    const result = transformDataToUserTasks(users, projects, tasks);
    const alice = result.find((u) => u.name === "Alice");
    expect(alice?.total_estimate).toBe(10);
  });

  it("считает total_estimate проекта только по задачам этого проекта", () => {
    const tasks: TaskDto[] = [
      { id: 1, name: "T1", project_id: 1, estimate: 4, responsible_id: 10 },
      { id: 2, name: "T2", project_id: 2, estimate: 6, responsible_id: 10 },
    ];
    const result = transformDataToUserTasks(users, projects, tasks);
    const alice = result.find((u) => u.name === "Alice")!;
    const alpha = alice.projects_estimates.find((p) => p.name === "Alpha")!;
    expect(alpha.total_estimate).toBe(4);
    const beta = alice.projects_estimates.find((p) => p.name === "Beta")!;
    expect(beta.total_estimate).toBe(6);
  });

  it("группирует задачи из разных проектов в отдельные projects_estimates", () => {
    const tasks: TaskDto[] = [
      { id: 1, name: "T1", project_id: 1, estimate: 2, responsible_id: 10 },
      { id: 2, name: "T2", project_id: 2, estimate: 3, responsible_id: 10 },
    ];
    const result = transformDataToUserTasks(users, projects, tasks);
    const alice = result.find((u) => u.name === "Alice")!;
    expect(alice.projects_estimates).toHaveLength(2);
  });

  it("исключает пользователей без задач", () => {
    const tasks: TaskDto[] = [
      { id: 1, name: "T1", project_id: 1, estimate: 5, responsible_id: 10 },
    ];
    const result = transformDataToUserTasks(users, projects, tasks);
    expect(result.every((u) => u.name !== "Bob")).toBe(true);
  });
});
