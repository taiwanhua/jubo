/* eslint-disable no-unused-vars -- need @mui/material/styles  */
/* eslint-disable @typescript-eslint/no-unused-vars -- need @mui/material/styles */
import type {
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
