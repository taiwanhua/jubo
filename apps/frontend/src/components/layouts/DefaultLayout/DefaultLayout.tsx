"use client";

import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import Box from "@mui/material/Box";
import type { SX } from "@/src/hooks/theme/useSx";
import { useSx } from "@/src/hooks/theme/useSx";
import Header from "./Header";
import Footer from "./Footer";

export type Props = PropsWithChildren<{
  className?: string;
  sx?: SX;
  pageTitle?: string;
}>;

const DefaultLayout: FC<Props> = ({ children }) => {
  const mainBoxSx = useSx(
    () => ({
      flexGrow: 1,
      padding: 3,
      overflow: "auto",
      height: "100vh",
      maxWidth: "64rem",
      margin: "0 auto",
      // minHeight: 0,
    }),
    [],
  );
  const boxSx = useSx(
    () => ({
      minWidth: "30rem",
      minHeight: "32rem",
    }),
    [],
  );
  return (
    <Box component="main" sx={mainBoxSx}>
      <Box sx={boxSx}>
        <Header />
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default memo(DefaultLayout);
