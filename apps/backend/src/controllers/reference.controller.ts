import type { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import type { Reference } from "@/interfaces/reference.interface";
import { ReferenceService } from "@/services/reference.service";
import type {
  CreateReferenceDto,
  UpdateReferenceDto,
} from "@/dtos/reference.dto";

export class ReferenceController {
  public reference = Container.get(ReferenceService);

  public getReferences = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllReferencesData: Reference[] =
        await this.reference.findAllReference();

      res.status(200).json({ data: findAllReferencesData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getReferenceById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const referenceId = req.params.id!;
      const findOneReferenceData: Reference =
        await this.reference.findReferenceById(referenceId);

      res.status(200).json({ data: findOneReferenceData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createReference = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const referenceData: CreateReferenceDto = req.body;
      const createReferenceData: Reference =
        await this.reference.createReference(referenceData);

      res.status(201).json({ data: createReferenceData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateReference = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const referenceId = req.params.id!;
      const referenceData: UpdateReferenceDto = req.body;
      const updateReferenceData: Reference =
        await this.reference.updateReference(referenceId, referenceData);

      res.status(200).json({ data: updateReferenceData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteReference = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const referenceId = req.params.id!;
      const deleteReferenceData: Reference =
        await this.reference.deleteReference(referenceId);

      res.status(200).json({ data: deleteReferenceData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
