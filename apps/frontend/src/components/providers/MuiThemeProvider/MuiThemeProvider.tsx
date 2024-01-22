import type { FC, ReactNode } from "react";
import { memo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@/src/hooks/theme/useTheme";

export interface MuiThemeProviderProps {
  children: ReactNode;
}

const MuiThemeProviderFC: FC<MuiThemeProviderProps> = ({ children }) => {
  const { theme } = useTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const MuiThemeProvider = memo(MuiThemeProviderFC);
