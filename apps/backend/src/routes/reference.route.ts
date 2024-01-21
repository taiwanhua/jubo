import { Router } from "express";
import { ReferenceController } from "@/controllers/reference.controller";
import {
  assignReferenceDto,
  reassignReferenceDto,
  unassignReferenceDto,
} from "@/dtos/reference.dto";
import { validationRequestBodyMiddleware } from "@/middlewares/validation.middleware";
import { Routes } from "@/interfaces/routes.interface";

export class ReferenceRoute implements Routes {
  public path = "/references";
  public router = Router();
  public reference = new ReferenceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}/assign`,
      validationRequestBodyMiddleware(assignReferenceDto),
      this.reference.updateReference,
    );
    this.router.put(
      `${this.path}/unassign`,
      validationRequestBodyMiddleware(unassignReferenceDto),
      this.reference.updateReference,
    );
    this.router.put(
      `${this.path}/reassign`,
      validationRequestBodyMiddleware(reassignReferenceDto),
      this.reference.updateReference,
    );

    // this.router.get(`${this.path}`, this.reference.getReferences);
    // this.router.get(`${this.path}/:id`, this.reference.getReferenceById);
    // this.router.post(
    //   `${this.path}`,
    //   validationRequestBodyMiddleware(createReferenceDto),
    //   this.reference.createReference,
    // );
    // this.router.put(
    //   `${this.path}/:id`,
    //   validationRequestBodyMiddleware(updateReferenceDto, true),
    //   this.reference.updateReference,
    // );
    // this.router.delete(`${this.path}/:id`, this.reference.deleteReference);
  }
}
