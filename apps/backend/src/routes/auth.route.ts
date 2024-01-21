import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { CreateUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { validationMiddleware } from "@middlewares/validation.middleware";

export class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}signup`,
      validationMiddleware(CreateUserDto),
      this.auth.signUp,
    );
    this.router.post(
      `${this.path}login`,
      validationMiddleware(CreateUserDto),
      this.auth.logIn,
    );
    this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
  }
}
