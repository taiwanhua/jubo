import { useState, useCallback, useMemo } from "react";
import type { AlertColor } from "@mui/material/Alert";
import type { SnackbarAlertProps } from "@/src/components/alerts/SnackbarAlert";

export type SnackbarAlertMessageAndSeverity = Pick<
  SnackbarAlertProps,
  "message" | "severity"
>;

export interface ReturnType {
  showSnackbarAlert: (
    messageAndSeverity: SnackbarAlertMessageAndSeverity,
  ) => void;
  snackbarAlertProps: {
    key: string;
    message?: string | undefined;
    severity?: AlertColor | undefined;
    open: boolean;
    onClose: () => void;
  };
}

export function useSnackbarAlert(): ReturnType {
  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
  const [snackbarAlertMessageAndSeverity, setSnackbarAlertMessageAndSeverity] =
    useState<SnackbarAlertMessageAndSeverity>({
      message: "",
      severity: "success",
    });

  const snackbarAlertOnClose = useCallback(() => {
    setSnackbarAlertOpen(false);
  }, []);

  const showSnackbarAlert = useCallback(
    (messageAndSeverity: SnackbarAlertMessageAndSeverity) => {
      setSnackbarAlertOpen(true);
      setSnackbarAlertMessageAndSeverity(messageAndSeverity);
    },
    [],
  );

  const key = useMemo<string>(
    () => `${Math.random()}${JSON.stringify(snackbarAlertMessageAndSeverity)}`,
    [snackbarAlertMessageAndSeverity],
  );

  return {
    showSnackbarAlert,
    snackbarAlertProps: {
      open: snackbarAlertOpen,
      onClose: snackbarAlertOnClose,
      ...snackbarAlertMessageAndSeverity,
      key,
    },
  };
}
