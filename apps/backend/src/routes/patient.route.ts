import { Router } from "express";
import { PatientController } from "@controllers/patient.controller";
import { createPatientDto, updatePatientDto } from "@dtos/patient.dto";
import { Routes } from "@interfaces/routes.interface";
import { validationMiddleware } from "@/middlewares/validation.middleware";

export class PatientRoute implements Routes {
  public path = "/patients";
  public router = Router();
  public patient = new PatientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.patient.getPatients);
    this.router.get(`${this.path}/:id(\\d+)`, this.patient.getPatientById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(createPatientDto),
      this.patient.createPatient,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(updatePatientDto),
      this.patient.updatePatient,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.patient.deletePatient);
  }
}
