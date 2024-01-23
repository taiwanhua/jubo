import { Router } from "express";
import { PatientController } from "@/controllers/patient.controller";
import { createPatientDto, updatePatientDto } from "@/dtos/patient.dto";
import type { Routes } from "@/interfaces/routes.interface";
import { validationRequestBodyMiddleware } from "@/middlewares/validation.middleware";
import { asyncWrapper } from "@/utils/asyncWrapper";

export class PatientRoute implements Routes {
  public path = "/patients";
  public router = Router();
  public patient = new PatientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, asyncWrapper(this.patient.getPatients));
    this.router.get(
      `${this.path}/:id`,
      asyncWrapper(this.patient.getPatientById),
    );
    this.router.post(
      this.path,
      validationRequestBodyMiddleware(createPatientDto),
      asyncWrapper(this.patient.createPatient),
    );
    this.router.put(
      `${this.path}/:id`,
      validationRequestBodyMiddleware(updatePatientDto),
      asyncWrapper(this.patient.updatePatient),
    );
    this.router.delete(
      `${this.path}/:id`,
      asyncWrapper(this.patient.deletePatient),
    );
  }
}
