import { ConfirmationsProvider } from "@/common/ui/confirmation";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ConfirmationsProvider>{children}</ConfirmationsProvider>;
}
