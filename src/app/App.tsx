import { ConfirmAction } from "@/modules/confirm-action";
import { UserTasks } from "@/modules/user-tasks";
import { AppProviders } from "./AppProviders.tsx";

function App() {
  return (
    <AppProviders>
      <main>
        <UserTasks />
        <ConfirmAction />
      </main>
    </AppProviders>
  );
}

export default App;
