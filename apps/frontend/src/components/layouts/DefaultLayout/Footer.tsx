import type { FC } from "react";
import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import { useSx, type SX } from "@/src/hooks/theme/useSx";

export interface HeaderProps {
  sx?: SX;
}

const Header: FC<HeaderProps> = ({ sx }) => {
  const boxSX = useSx(
    () => ({
      padding: 1,
      fontWeight: "lighter",
      ...sx,
    }),
    [sx],
  );

  const iconButtonSX = useSx(() => ({ margin: 0 }), []);

  return (
    <Box component="footer" sx={boxSX}>
      Arhua Ho ©2023-present Created by
      <IconButton
        color="secondary"
        href="https://github.com/taiwanhua/world"
        rel="noopener noreferrer"
        sx={iconButtonSX}
        target="_blank"
      >
        <GitHubIcon />
      </IconButton>
    </Box>
  );
};

export default memo(Header);
