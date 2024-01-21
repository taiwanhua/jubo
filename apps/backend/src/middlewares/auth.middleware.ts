import { PrismaClient } from "@prisma/client";
import type { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { HttpException } from "@exceptions/httpException";
import type {
  DataStoredInToken,
  RequestWithUser,
} from "@interfaces/auth.interface";
type Authorization = string | null | undefined;

const getAuthorization = (req: RequestWithUser): Authorization => {
  const cookie = (req.cookies as Record<string, string> | undefined)
    ?.Authorization;

  if (cookie) {
    return cookie;
  }

  const header = req.header("Authorization");

  if (header) {
    return header.split("Bearer ")[1];
  }

  return null;
};

export const AuthMiddleware = (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id } = verify(
        Authorization,
        SECRET_KEY ?? "",
      ) as DataStoredInToken;
      const users = new PrismaClient().user;
      const findUser = await users.findUnique({ where: { id: Number(id) } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};
