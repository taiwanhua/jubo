import { Service } from "typedi";
import type { Prisma } from "@prisma/client";
import type {
  AssignRelevanceDto,
  UnassignRelevanceDto,
  ReassignRelevanceDto,
  CreateRelevanceDto,
  UpdateRelevanceDto,
} from "@/dtos/relevance.dto";
import { HttpException } from "@/exceptions/httpException";
import type { Relevance } from "@/interfaces/relevance.interface";
import prisma from "@/prisma/client";
import { fillEmptyArray } from "@/utils/fillEmptyArray";

export type ReassignRelevanceReturn = [Relevance[], number];

@Service()
export class RelevanceService {
  // public relevance = new PrismaClient().relevance;
  public relevance = prisma.relevance;

  public async findAllRelevance(): Promise<Relevance[]> {
    const allRelevance = await this.relevance.findMany();
    return allRelevance;
  }

  public async findRelevanceById(relevanceId: string): Promise<Relevance> {
    const findRelevance: Relevance | null = await this.relevance.findUnique({
      where: { id: relevanceId },
    });

    if (!findRelevance) {
      throw new HttpException(409, "Relevance doesn't exist");
    }

    return findRelevance;
  }

  public async createRelevance(
    relevanceData: CreateRelevanceDto,
  ): Promise<Relevance> {
    // const findRelevance: Relevance | null = await this.relevance.findFirst({
    //   where: { name: relevanceData.name },
    // });
    // if (findRelevance)
    //   throw new HttpException(
    //     409,
    //     `This email ${relevanceData.email} already exists`,
    //   );

    const createRelevanceData: Relevance = await this.relevance.create({
      data: {
        ...relevanceData,
        first_id: relevanceData.first_id ?? "",
        second_id: relevanceData.second_id ?? "",
        third_id: relevanceData.third_id ?? "",
      },
    });
    return createRelevanceData;
  }

  public async updateRelevance(
    relevanceId: string,
    relevanceData: UpdateRelevanceDto,
  ): Promise<Relevance> {
    const findRelevance: Relevance | null = await this.relevance.findUnique({
      where: { id: relevanceId },
    });
    if (!findRelevance) {
      throw new HttpException(409, "Relevance doesn't exist");
    }

    const updateRelevanceData = await this.relevance.update({
      where: { id: relevanceId },
      data: { ...relevanceData },
    });
    return updateRelevanceData;
  }

  public async deleteRelevance(relevanceId: string): Promise<Relevance> {
    const findRelevance: Relevance | null = await this.relevance.findUnique({
      where: { id: relevanceId },
    });

    if (!findRelevance) throw new HttpException(409, "Relevance doesn't exist");

    const deleteRelevanceData = await this.relevance.delete({
      where: { id: relevanceId },
    });
    return deleteRelevanceData;
  }

  public async assignRelevance(
    relevanceData: AssignRelevanceDto,
  ): Promise<Relevance[]> {
    const {
      type,
      first_ids: firstIds = [],
      second_ids: secondIds = [],
      third_ids: thirdIds = [],
    } = relevanceData;

    const firstIdsFilled = fillEmptyArray(firstIds, "");
    const secondIdsFilled = fillEmptyArray(secondIds, "");
    const thirdIdsFilled = fillEmptyArray(thirdIds, "");

    const combinations: Prisma.relevanceCreateArgs["data"][] =
      firstIdsFilled.flatMap((firstId) =>
        secondIdsFilled.flatMap((secondId) =>
          thirdIdsFilled.map((thirdId) => ({
            first_id: firstId,
            second_id: secondId,
            third_id: thirdId,
            type,
          })),
        ),
      );

    const assignRelevanceData = await prisma.$transaction(async (tx) => {
      const promises = combinations.map((data) =>
        tx.relevance.create({ data }),
      );

      const createRelevances = await Promise.all(promises);
      return createRelevances;
    });

    return assignRelevanceData;
  }

  public async unassignRelevance(
    relevanceData: UnassignRelevanceDto,
  ): Promise<number> {
    const {
      type,
      first_ids: firstIds,
      second_ids: secondIds,
      third_ids: thirdIds,
    } = relevanceData;

    const unassignRelevanceData = await prisma.$transaction(async (tx) => {
      const { count } = await tx.relevance.deleteMany({
        where: {
          type,
          AND: {
            first_id: { in: firstIds },
            second_id: { in: secondIds },
            third_id: { in: thirdIds },
          },
        },
      });

      return count;
    });

    return unassignRelevanceData;
  }

  public async reassignRelevance(
    relevanceData: ReassignRelevanceDto,
  ): Promise<ReassignRelevanceReturn> {
    const { assign, unassign } = relevanceData;

    const reassignRelevanceData: ReassignRelevanceReturn =
      await prisma.$transaction(async (tx) => {
        const reassignRelevanceReturn: ReassignRelevanceReturn = [[], 0];

        // unassign
        const { count } = await tx.relevance.deleteMany({
          where: {
            type: unassign.type,
            AND: {
              first_id: { in: unassign.first_ids },
              second_id: { in: unassign.second_ids },
              third_id: { in: unassign.third_ids },
            },
          },
        });

        reassignRelevanceReturn[1] = count;

        // assign
        const firstIdsFilled = fillEmptyArray(assign.first_ids ?? [], "");
        const secondIdsFilled = fillEmptyArray(assign.second_ids ?? [], "");
        const thirdIdsFilled = fillEmptyArray(assign.third_ids ?? [], "");

        const combinations: Prisma.relevanceCreateArgs["data"][] =
          firstIdsFilled.flatMap((firstId) =>
            secondIdsFilled.flatMap((secondId) =>
              thirdIdsFilled.map((thirdId) => ({
                first_id: firstId,
                second_id: secondId,
                third_id: thirdId,
                type: assign.type,
              })),
            ),
          );

        const promises = combinations.map((data) =>
          tx.relevance.create({ data }),
        );

        const createRelevances = await Promise.all(promises);

        reassignRelevanceReturn[0] = createRelevances;

        return reassignRelevanceReturn;
      });

    return reassignRelevanceData;
  }
}
