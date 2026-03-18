import { createStrictContext, useStrictContext } from "@/common/lib/react";
import type { ConfirmationContext } from "./types";

export const confirmationContext = createStrictContext<ConfirmationContext>();

export const useGetConfirmation = () => {
  return useStrictContext(confirmationContext);
};
