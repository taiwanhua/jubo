import type { ThemeOptions } from "@mui/material/styles";
import { defaultThemeOptions } from "./defaultTheme";

export type ThemeKey = "DEFAULT_THEME";

export const themeOptionsMapping: Record<ThemeKey, ThemeOptions> = {
  DEFAULT_THEME: defaultThemeOptions,
};
