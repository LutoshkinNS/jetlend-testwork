import { useState } from "react";
import type { ConfirmSlotProps } from "@/common/ui/confirmation";
import { useCountdown } from "../model/useCountdown";

export function ConfirmButton({ onConfirm }: ConfirmSlotProps) {
  const [openedAt] = useState(() => Date.now());
  const { remaining, isComplete } = useCountdown(5, true, openedAt);

  return (
    <button
      onClick={onConfirm}
      disabled={!isComplete}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
    >
      {isComplete ? "Подтвердить" : `Подтвердить (${remaining})`}
    </button>
  );
}
