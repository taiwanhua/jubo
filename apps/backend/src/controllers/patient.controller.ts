import type { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import type { Patient } from "@/interfaces/patient.interface";
import { PatientService } from "@/services/patient.service";
import type { CreatePatientDto, UpdatePatientDto } from "@/dtos/patient.dto";
import { HttpException } from "@/exceptions/httpException";
import { RelevanceService } from "@/services/relevance.service";
import { OrderService } from "@/services/order.service";
import type { Order } from "@/interfaces/order.interface";

export class PatientController {
  public patient = Container.get(PatientService);
  public relevance = Container.get(RelevanceService);
  public order = Container.get(OrderService);

  public getPatients = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findManyPatientsData: Patient[] =
        await this.patient.findManyPatient();

      const findManyPatientIds = findManyPatientsData.map(({ id }) => id);

      const findPatientOrderRelevances = await this.relevance.findManyRelevance(
        {
          type: "PatientOrder",
          first_ids: findManyPatientIds,
        },
      );

      const findPatientOrderRelevanceIds = findPatientOrderRelevances.map(
        ({ second_id: secondId }) => secondId,
      );

      const findManyOrderData = await this.order.findManyOrder({
        ids: findPatientOrderRelevanceIds,
      });

      const findManyPatientsWithOrdersData = findManyPatientsData.map(
        (patient) => {
          const orders = findPatientOrderRelevances.reduce<Order[]>(
            (acc, cur) => {
              if (cur.first_id === patient.id) {
                acc.push(
                  findManyOrderData.find(({ id }) => id === cur.second_id)!,
                );
              }
              return acc;
            },
            [],
          );

          return {
            ...patient,
            orders,
          };
        },
      );

      res
        .status(200)
        .json({ data: findManyPatientsWithOrdersData, message: "findMany" });
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
      const patientId = req.params.id;

      if (!patientId) {
        throw new HttpException(400, "Id is required");
      }

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
      const patientData = req.body as CreatePatientDto;
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
      const patientId = req.params.id;

      if (!patientId) {
        throw new HttpException(400, "Id is required");
      }

      const patientData = req.body as UpdatePatientDto;
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
      const patientId = req.params.id;

      if (!patientId) {
        throw new HttpException(400, "Id is required");
      }

      const deletePatientData: Patient = await this.patient.deletePatient(
        patientId,
      );

      res.status(200).json({ data: deletePatientData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
