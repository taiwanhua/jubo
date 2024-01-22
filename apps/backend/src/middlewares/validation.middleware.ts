import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
import { HttpException } from "@/exceptions/httpException";

/**
 * validationMiddleware
 * @remarks - validation data from user is correct
 * @param type - Dto Schema Type
 */
export const validationRequestBodyMiddleware = <
  DtoSchemaType extends ZodTypeAny,
>(
  type: DtoSchemaType,
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const validation = type.safeParse(req.body);

    if (validation.success) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- just put data to body
      req.body = validation.data;
      next();
    } else {
      const errorMessage = validation.error.issues
        .map(({ path, message }) => `${path.join(".")} : ${message}`)
        .join(", ");

      next(new HttpException(400, errorMessage));
    }
  };
};
