import type { ComponentType, ReactNode } from 'react';

export interface ConfirmSlotProps {
  onConfirm: () => void;
}

export interface ConfirmationProps {
  title?: string;
  description?: string;
  rejectText?: string;
  ConfirmSlot?: ComponentType<ConfirmSlotProps>;
  shouldCloseOnConfirm?: boolean;
}

export interface ConfirmationDialogProps {
  title: string;
  description: string;
  rejectText: string;
  ConfirmSlot: ReactNode;
  onClose: () => void;
}

export interface ConfirmationContext {
  getConfirmation: (props?: ConfirmationProps) => Promise<boolean>;
  closeConfirmation: () => void;
}
