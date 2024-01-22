export const fillEmptyArray = <T>(array: T[], fill: T): T[] => {
  return array.length === 0 ? [fill] : array;
};
