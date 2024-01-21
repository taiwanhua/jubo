import type { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions/httpException";
import { ZodTypeAny } from "zod";

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
      req.body = validation.data;
      next();
    } else {
      const message = validation.error.issues
        .map(({ path, message }) => `${path.join(".")} : ${message}`)
        .join(", ");

      next(new HttpException(400, message));
    }
  };
};
