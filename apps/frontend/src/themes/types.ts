import type {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  Theme as MuiTheme,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
