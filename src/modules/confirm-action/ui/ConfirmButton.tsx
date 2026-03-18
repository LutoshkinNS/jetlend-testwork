import { useState } from "react";
import type { ConfirmSlotProps } from "@/common/ui/confirmation";
import { useCountdown } from "../model/useCountdown";

export function ConfirmButton({ onConfirm }: ConfirmSlotProps) {
  const [openedAt] = useState(() => Date.now());
  const { remaining, isComplete } = useCountdown(5, true, openedAt);

  return (
    <button onClick={onConfirm} disabled={!isComplete}>
      {isComplete ? "Подтвердить" : `Подтвердить (${remaining})`}
    </button>
  );
}
