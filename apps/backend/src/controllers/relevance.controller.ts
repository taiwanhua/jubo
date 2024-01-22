import type { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import type { Relevance } from "@/interfaces/relevance.interface";
import { RelevanceService } from "@/services/relevance.service";
import type {
  AssignRelevanceDto,
  UnassignRelevanceDto,
  ReassignRelevanceDto,
  CreateRelevanceDto,
  UpdateRelevanceDto,
  FindManyRelevanceArgsDto,
  ReassignRelevanceReturnDto,
} from "@/dtos/relevance.dto";
import { HttpException } from "@/exceptions/httpException";

export class RelevanceController {
  public relevance = Container.get(RelevanceService);

  public getRelevances = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const args = req.params as unknown as FindManyRelevanceArgsDto;

      const findManyRelevancesData: Relevance[] =
        await this.relevance.findManyRelevance(args);

      res
        .status(200)
        .json({ data: findManyRelevancesData, message: "findMany" });
    } catch (error) {
      next(error);
    }
  };

  public getRelevanceById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const relevanceId = req.params.id;

      if (!relevanceId) {
        throw new HttpException(400, "Id is required");
      }

      const findOneRelevanceData: Relevance =
        await this.relevance.findRelevanceById(relevanceId);

      res.status(200).json({ data: findOneRelevanceData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createRelevance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const relevanceData = req.body as CreateRelevanceDto;
      const createRelevanceData: Relevance =
        await this.relevance.createRelevance(relevanceData);

      res.status(201).json({ data: createRelevanceData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateRelevance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const relevanceId = req.params.id;

      if (!relevanceId) {
        throw new HttpException(400, "Id is required");
      }

      const relevanceData = req.body as UpdateRelevanceDto;
      const updateRelevanceData: Relevance =
        await this.relevance.updateRelevance(relevanceId, relevanceData);

      res.status(200).json({ data: updateRelevanceData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteRelevance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const relevanceId = req.params.id;

      if (!relevanceId) {
        throw new HttpException(400, "Id is required");
      }

      const deleteRelevanceData: Relevance =
        await this.relevance.deleteRelevance(relevanceId);

      res.status(200).json({ data: deleteRelevanceData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public assignRelevance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const relevanceData = req.body as AssignRelevanceDto;
      const assignRelevanceData: Relevance[] =
        await this.relevance.assignRelevance(relevanceData);

      res.status(200).json({ data: assignRelevanceData, message: "assign" });
    } catch (error) {
      next(error);
    }
  };
  public unassignRelevance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const relevanceData = req.body as UnassignRelevanceDto;
      const unassignRelevanceData: number =
        await this.relevance.unassignRelevance(relevanceData);

      res
        .status(200)
        .json({ data: unassignRelevanceData, message: "unassign" });
    } catch (error) {
      next(error);
    }
  };

  public reassignRelevance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const relevanceData = req.body as ReassignRelevanceDto;
      const reassignRelevanceData: ReassignRelevanceReturnDto =
        await this.relevance.reassignRelevance(relevanceData);

      res
        .status(200)
        .json({ data: reassignRelevanceData, message: "reassign" });
    } catch (error) {
      next(error);
    }
  };
}
