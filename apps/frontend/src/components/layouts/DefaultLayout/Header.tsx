import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import type { IconButtonProps } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NextLinkButton from "@/src/components/links/NextLinkButton";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { useSx, type SX } from "@/src/hooks/theme/useSx";

export interface HeaderProps {
  className?: string;
  sx?: SX;
}

const Header: FC<HeaderProps> = () => {
  const { paletteMode, paletteModeMutate } = useTheme();

  const isDark = useMemo<boolean>(() => paletteMode === "dark", [paletteMode]);

  const onClick = useCallback<
    NonNullable<IconButtonProps["onClick"]>
  >((): void => {
    paletteModeMutate(isDark ? "light" : "dark");
  }, [isDark, paletteModeMutate]);

  const boxSX = useSx(
    () => ({
      width: "100%",
      minWidth: "fit-content",
      justifyContent: "center",
    }),
    [],
  );

  return (
    <Box sx={boxSX}>
      <Paper elevation={12}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          padding={1}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          width="100%"
        >
          <NextLinkButton href="/" label="Home" />
          <NextLinkButton href="/about" label="About" />
          <NextLinkButton href="/post" label="Post" />
          <NextLinkButton href="/need-ai" label="AI Secretary" />

          <IconButton onClick={onClick}>
            {isDark ? <Brightness4Icon /> : <Brightness5Icon />}
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default memo(Header);
