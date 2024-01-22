import type { Request, Response, NextFunction } from "express";

/**
 * asyncWrapper
 * @remarks - To solve eslint problem which is "Promise returned in function argument where a void return was expected."
 *            eslint\@typescript-eslint/no-misused-promises
 * @param type - Dto Schema Type
 * @see - https://github.com/mightyiam/eslint-config-standard-with-typescript/issues/613#issuecomment-1082960337
 */
export const asyncWrapper = (
  asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFn(req, res, next).catch(next);
  };
};
