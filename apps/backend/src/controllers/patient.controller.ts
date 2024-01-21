import type { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import type { Patient } from "@/interfaces/patient.interface";
import { PatientService } from "@/services/patient.service";
import type { CreatePatientDto, UpdatePatientDto } from "@/dtos/patient.dto";

export class PatientController {
  public patient = Container.get(PatientService);

  public getPatients = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllPatientsData: Patient[] =
        await this.patient.findAllPatient();

      res.status(200).json({ data: findAllPatientsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getPatientById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const patientId = req.params.id!;
      const findOnePatientData: Patient = await this.patient.findPatientById(
        patientId,
      );

      res.status(200).json({ data: findOnePatientData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createPatient = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const patientData: CreatePatientDto = req.body;
      const createPatientData: Patient = await this.patient.createPatient(
        patientData,
      );

      res.status(201).json({ data: createPatientData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updatePatient = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const patientId = req.params.id!;
      const patientData: UpdatePatientDto = req.body;
      const updatePatientData: Patient = await this.patient.updatePatient(
        patientId,
        patientData,
      );

      res.status(200).json({ data: updatePatientData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deletePatient = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const patientId = req.params.id!;
      const deletePatientData: Patient = await this.patient.deletePatient(
        patientId,
      );

      res.status(200).json({ data: deletePatientData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
