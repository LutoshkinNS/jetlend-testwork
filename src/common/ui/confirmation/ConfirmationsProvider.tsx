import { useMemo, useState } from 'react';
import { confirmationContext } from './confirmation';
import { ConfirmationDialog } from './ConfirmationDialog';
import type {
  ConfirmationDialogProps,
  ConfirmationProps,
  ConfirmSlotProps,
} from './types';

function DefaultConfirmButton({ onConfirm }: ConfirmSlotProps) {
  return <button onClick={onConfirm}>Подтвердить</button>;
}

export function ConfirmationsProvider({ children }: { children: React.ReactNode }) {
  const [dialogProps, setDialogProps] = useState<ConfirmationDialogProps>();

  const contextValue = useMemo(() => {
    const closeConfirmation = () => {
      dialogProps?.onClose();
    };

    const getConfirmation = ({
      shouldCloseOnConfirm = true,
      rejectText = 'Отмена',
      ConfirmSlot = DefaultConfirmButton,
      title = 'Подтверждение',
      description = 'Вы уверены?',
    }: ConfirmationProps = {}): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const onConfirm = () => {
          if (shouldCloseOnConfirm) {
            setDialogProps(undefined);
          }
          resolve(true);
        };

        const onClose = () => {
          setDialogProps(undefined);
          resolve(false);
        };

        setDialogProps({
          title,
          description,
          rejectText,
          ConfirmSlot: <ConfirmSlot onConfirm={onConfirm} />,
          onClose,
        });
      });
    };

    return { getConfirmation, closeConfirmation };
  }, [dialogProps]);

  return (
    <confirmationContext.Provider value={contextValue}>
      {children}
      {dialogProps && <ConfirmationDialog {...dialogProps} />}
    </confirmationContext.Provider>
  );
}
