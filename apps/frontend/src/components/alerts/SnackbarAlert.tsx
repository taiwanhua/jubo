import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import Snackbar from "@mui/material/Snackbar";
import type { AlertProps, AlertColor } from "@mui/material/Alert";
import MuiAlert from "@mui/material/Alert";
import type { GrowProps } from "@mui/material/Grow";
import Grow from "@mui/material/Grow";
import type { FC } from "react";
import { forwardRef, memo, useCallback, useMemo } from "react";
import type { BoxProps, SnackbarOrigin } from "@mui/material";
import { useSx } from "@/src/hooks/theme/useSx";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

export interface SnackbarAlertProps {
  sx?: BoxProps["sx"];
  severity?: AlertColor;
  message?: string;
  open: boolean;
  onClose: () => void;
}

const autoHideDuration = 3000;

function transition(props: GrowProps): JSX.Element {
  return <Grow {...props} />;
}

const SnackbarAlertFC: FC<SnackbarAlertProps> = ({
  sx,
  severity = "success",
  message = "",
  open,
  onClose,
}) => {
  const handleClose = useCallback(
    (_event: unknown, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }
      onClose();
    },
    [onClose],
  );

  const anchorOrigin = useMemo<SnackbarOrigin>(
    () => ({ horizontal: "right", vertical: "top" }),
    [],
  );

  const alertSx = useSx(
    () => ({
      width: "100%",
      "& .MuiIconButton-root": {
        marginTop: 0,
      },
    }),
    [],
  );

  return (
    <Snackbar
      TransitionComponent={transition}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={open}
      sx={sx}
    >
      <Alert onClose={handleClose} severity={severity} sx={alertSx}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const SnackbarAlert = memo(SnackbarAlertFC);
