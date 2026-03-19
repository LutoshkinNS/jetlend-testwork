import type { TaskEntry } from "../model/types";

interface TasksProps {
  tasks: TaskEntry[];
}

export function TaskList({ tasks }: TasksProps) {
  return (
    <ul className="mt-0.5 flex list-none flex-col gap-0.5 pl-4 text-gray-500">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="px-1"
        >
          {task.name} — {task.estimate}ч
        </li>
      ))}
    </ul>
  );
}
