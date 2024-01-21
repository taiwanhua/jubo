import { Router } from "express";
import { ReferenceController } from "@controllers/reference.controller";
import { CreateReferenceDto } from "@dtos/reference.dto";
import { Routes } from "@interfaces/routes.interface";
import { validationMiddleware } from "@/middlewares/validation.middleware";

export class ReferenceRoute implements Routes {
  public path = "/reference";
  public router = Router();
  public reference = new ReferenceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.reference.getReferences);
    this.router.get(`${this.path}/:id(\\d+)`, this.reference.getReferenceById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateReferenceDto),
      this.reference.createReference,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateReferenceDto, true),
      this.reference.updateReference,
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.reference.deleteReference,
    );
  }
}
