import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export function useMatchBreakpointLg(): boolean {
  const theme = useTheme();
  const lgWidthMatch = useMediaQuery(theme.breakpoints.up("lg"));

  return lgWidthMatch;
}
