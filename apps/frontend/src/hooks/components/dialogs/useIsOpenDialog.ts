import { useState, useCallback } from "react";
import { delay } from "lodash-es";
import { useTheme } from "@/src/hooks/theme/useTheme";

type CallBack = () => void;

export interface ReturnType {
  isDialogOpen: boolean;
  handleSetDialogOpen: (nextDialogOpen: boolean) => void;
  handleDialogOpen: () => void;
  handleDialogClose: (callBack?: CallBack) => void;
  handleDialogJustClose: () => void;
}

export function useIsOpenDialog(): ReturnType {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    theme: {
      transitions: {
        duration: { leavingScreen },
      },
    },
  } = useTheme();

  const handleSetDialogOpen = useCallback((nextDialogOpen: boolean) => {
    setIsDialogOpen(nextDialogOpen);
  }, []);

  const handleDialogOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(
    (callBack?: CallBack) => {
      setIsDialogOpen(false);
      if (callBack) {
        delay(callBack, leavingScreen);
      }
    },
    [leavingScreen],
  );

  const handleDialogJustClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    isDialogOpen,
    handleSetDialogOpen,
    handleDialogOpen,
    handleDialogClose,
    handleDialogJustClose,
  };
}
