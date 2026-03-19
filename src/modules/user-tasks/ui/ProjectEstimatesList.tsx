import type { ProjectEstimate } from "../model/types";

interface ProjectEstimatesListProps {
  projectsEstimates: ProjectEstimate[];
  renderProjectChildren: (project: ProjectEstimate) => React.ReactNode;
}

export function ProjectEstimatesList({
  projectsEstimates,
  renderProjectChildren,
}: ProjectEstimatesListProps) {
  return (
    <ul className="mt-1 flex list-disc flex-col gap-1 pl-5 text-sm text-gray-700">
      {projectsEstimates.map((project) => (
        <li key={project.id} className="px-1">
          {project.name} ({project.total_estimate}ч)
          {renderProjectChildren(project)}
        </li>
      ))}
    </ul>
  );
}
