import { memo, useEffect, useRef } from "react";
import type { ConfirmationDialogProps } from "./types";

export const ConfirmationDialog = memo(function ConfirmationDialog({
  title,
  description,
  rejectText,
  ConfirmSlot,
  onClose,
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      className="w-full max-w-md rounded-xl p-0 shadow-xl backdrop:bg-black/50 m-auto"
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
        >
          ×
        </button>
      </div>
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {rejectText}
        </button>
        {ConfirmSlot}
      </div>
    </dialog>
  );
});
