import { useState } from "react";
import { useFetch } from "@/common/lib/useFetch";
import { fetchUserTasks } from "../model/fetchUserTasks";
import { FetchButton } from "./FetchButton";
import { UserList } from "./UserList.tsx";
import { ProjectEstimatesList } from "./ProjectEstimatesList.tsx";
import { TaskList } from "./TaskList.tsx";

function UserTasksContent() {
  const { data, loading, error } = useFetch(fetchUserTasks);
  if (loading) return <p className="text-sm text-gray-500">Загрузка...</p>;
  if (error) return <p className="text-sm text-red-600">Ошибка: {error}</p>;
  if (data === null || !data.length)
    return <p className="text-sm text-gray-500">Нет данных</p>;

  return (
    <UserList
      users={data}
      renderUserChildren={(user) => (
        <ProjectEstimatesList
          projectsEstimates={user.projects_estimates}
          renderProjectChildren={(project) => (
            <TaskList tasks={project.tasks} />
          )}
        />
      )}
    />
  );
}

export function UserTasks() {
  const [started, setStarted] = useState(false);

  return (
    <section className="flex flex-col items-start gap-4 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Task 6</h1>
      {!started && <FetchButton onClick={() => setStarted(true)} />}
      {started && <UserTasksContent />}
    </section>
  );
}
