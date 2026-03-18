import { ConfirmAction } from "@/modules/confirm-action";
import { AppProviders } from "./AppProviders.tsx";

function App() {
  return (
    <AppProviders>
      <main>
        <ConfirmAction />
      </main>
    </AppProviders>
  );
}

export default App;
