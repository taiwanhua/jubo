import { Router } from "express";
import { RelevanceController } from "@/controllers/relevance.controller";
import {
  assignRelevanceDto,
  reassignRelevanceDto,
  unassignRelevanceDto,
} from "@/dtos/relevance.dto";
import { validationRequestBodyMiddleware } from "@/middlewares/validation.middleware";
import type { Routes } from "@/interfaces/routes.interface";
import { asyncWrapper } from "@/utils/asyncWrapper";

export class RelevanceRoute implements Routes {
  public path = "/relevances";
  public router = Router();
  public relevance = new RelevanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.put(
      `${this.path}/assign`,
      validationRequestBodyMiddleware(assignRelevanceDto),
      asyncWrapper(this.relevance.assignRelevance),
    );
    this.router.put(
      `${this.path}/unassign`,
      validationRequestBodyMiddleware(unassignRelevanceDto),
      asyncWrapper(this.relevance.unassignRelevance),
    );
    this.router.put(
      `${this.path}/reassign`,
      validationRequestBodyMiddleware(reassignRelevanceDto),
      asyncWrapper(this.relevance.reassignRelevance),
    );

    // this.router.get(this.path, asyncWrapper(this.relevance.getRelevances));
    // this.router.get(
    //   `${this.path}/:id`,
    //   asyncWrapper(this.relevance.getRelevanceById),
    // );
    // this.router.post(
    //   this.path,
    //   validationRequestBodyMiddleware(createRelevanceDto),
    //   asyncWrapper(this.relevance.createRelevance),
    // );
    // this.router.put(
    //   `${this.path}/:id`,
    //   validationRequestBodyMiddleware(updateRelevanceDto),
    //   asyncWrapper(this.relevance.updateRelevance),
    // );
    // this.router.delete(
    //   `${this.path}/:id`,
    //   asyncWrapper(this.relevance.deleteRelevance),
    // );
  }
}
