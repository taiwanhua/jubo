import type { FC, ReactNode } from "react";
import { memo, useCallback } from "react";
import type { DialogProps as MUIDialogProps } from "@mui/material/Dialog";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { ModalProps } from "@mui/material/Modal";
import type { BoxProps } from "@mui/material/Box";

export type RequiredModalProps = Required<ModalProps>;

export interface DialogProps extends Omit<MUIDialogProps, "content"> {
  className?: string;
  sx?: BoxProps["sx"];
  title: string;
  content: ReactNode;
  open: boolean;
  onClose: () => void;
  actionsComponent: ReactNode;
  disableBackdropClick?: boolean;
}

const DialogFC: FC<DialogProps> = ({
  className,
  sx,
  title,
  content,
  open,
  onClose,
  actionsComponent,
  disableBackdropClick = false,
  ...other
}) => {
  const handleClose = useCallback<RequiredModalProps["onClose"]>(
    (_event, reason) => {
      if (disableBackdropClick && reason === "backdropClick") {
        return;
      }
      onClose();
    },
    [disableBackdropClick, onClose],
  );

  return (
    <MuiDialog
      className={className}
      onClose={handleClose}
      open={open}
      sx={sx}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actionsComponent}</DialogActions>
    </MuiDialog>
  );
};

export const Dialog = memo(DialogFC);
