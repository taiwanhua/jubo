"use client";

import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import type { PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
// eslint-disable-next-line import/no-extraneous-dependencies
import { deepmerge } from "@mui/utils";
import { useLocalStorageState } from "@/src/hooks/browserCache/useLocalStorageState";
import type { ThemeKey } from "@/src/themes/themes";
import { themeOptionsMapping } from "@/src/themes/themes";

const defaultPaletteMode: PaletteMode = "dark";

const defaultThemeKey: ThemeKey = "DEFAULT_THEME";

export interface Return {
  theme: Theme;
  themeKey: ThemeKey;
  themeKeyMutate: Dispatch<SetStateAction<ThemeKey>>;
  removePaletteMode: () => void;
  paletteMode: PaletteMode;
  paletteModeMutate: Dispatch<SetStateAction<PaletteMode>>;
  removeThemeKey: () => void;
}

export function useTheme(): Return {
  const [paletteMode, paletteModeMutate, removePaletteMode] =
    useLocalStorageState("paletteMode", defaultPaletteMode);

  const [themeKey, themeKeyMutate, removeThemeKey] = useLocalStorageState(
    "themeKey",
    defaultThemeKey,
  );

  const theme = useMemo(() => {
    return createTheme(
      deepmerge(themeOptionsMapping[themeKey], {
        palette: {
          mode: paletteMode, // use MUI paletteMode, or can use multiple custom palette
        },
      }),
    );
  }, [themeKey, paletteMode]);

  return {
    theme,
    themeKey,
    themeKeyMutate,
    removePaletteMode,
    paletteMode,
    paletteModeMutate,
    removeThemeKey,
  };
}
