import type { UserEstimate } from "../model/types";

interface UserListProps {
  users: UserEstimate[];
  renderUserChildren: (user: UserEstimate) => React.ReactNode;
}

export function UserList({ users, renderUserChildren }: UserListProps) {
  return (
    <ol className="flex list-decimal flex-col gap-2 pl-5">
      {users.map((user) => (
        <li key={user.id} className="px-1">
          <span className="font-medium text-gray-900">
            {user.name} — {user.total_estimate}ч
          </span>
          {renderUserChildren(user)}
        </li>
      ))}
    </ol>
  );
}
