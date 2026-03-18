import { memo, useEffect, useRef } from 'react';
import type { ConfirmationDialogProps } from './types';

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
    <dialog ref={dialogRef} onCancel={onClose}>
      <div>
        <h2>{title}</h2>
        <button onClick={onClose}>×</button>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div>
        <button onClick={onClose}>{rejectText}</button>
        {ConfirmSlot}
      </div>
    </dialog>
  );
});
