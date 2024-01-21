import { Router } from "express";
import { PatientController } from "@/controllers/patient.controller";
import { createPatientDto, updatePatientDto } from "@/dtos/patient.dto";
import { Routes } from "@/interfaces/routes.interface";
import { validationRequestBodyMiddleware } from "@/middlewares/validation.middleware";

export class PatientRoute implements Routes {
  public path = "/patients";
  public router = Router();
  public patient = new PatientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.patient.getPatients);
    this.router.get(`${this.path}/:id`, this.patient.getPatientById);
    this.router.post(
      `${this.path}`,
      validationRequestBodyMiddleware(createPatientDto),
      this.patient.createPatient,
    );
    this.router.put(
      `${this.path}/:id`,
      validationRequestBodyMiddleware(updatePatientDto),
      this.patient.updatePatient,
    );
    this.router.delete(`${this.path}/:id`, this.patient.deletePatient);
  }
}
