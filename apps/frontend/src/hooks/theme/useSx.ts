import type { DependencyList } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import { useMemo } from "react";
import { isNil } from "lodash-es";

export function isNonNil<T>(target: T): target is Exclude<T, null | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- isNil
  return !isNil(target);
}

export type SX = SxProps<Theme> | undefined;

export const useSx = (
  handle: () => SX | SX[],
  compare?: DependencyList,
): SX => {
  return useMemo<SX>(() => {
    const sx = handle();
    return Array.isArray(sx) ? sx.flat().filter(isNonNil) : sx;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- DependencyList
  }, compare ?? []);
};
