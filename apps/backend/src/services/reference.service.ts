import { Service } from "typedi";
import type {
  CreateReferenceDto,
  UpdateReferenceDto,
} from "@/dtos/reference.dto";
import { HttpException } from "@/exceptions/httpException";
import type { Reference } from "@/interfaces/reference.interface";
import { prisma } from "@/prisma/client";

@Service()
export class ReferenceService {
  // public reference = new PrismaClient().reference;
  public reference = prisma.reference;

  public async findAllReference(): Promise<Reference[]> {
    const allReference = await this.reference.findMany();
    return allReference;
  }

  public async findReferenceById(referenceId: string): Promise<Reference> {
    const findReference: Reference | null = await this.reference.findUnique({
      where: { id: referenceId },
    });

    if (!findReference) {
      throw new HttpException(409, "Reference doesn't exist");
    }

    return findReference;
  }

  public async createReference(
    referenceData: CreateReferenceDto,
  ): Promise<Reference> {
    // const findReference: Reference | null = await this.reference.findFirst({
    //   where: { name: referenceData.name },
    // });
    // if (findReference)
    //   throw new HttpException(
    //     409,
    //     `This email ${referenceData.email} already exists`,
    //   );

    const createReferenceData: Reference = await this.reference.create({
      data: { ...referenceData },
    });
    return createReferenceData;
  }

  public async updateReference(
    referenceId: string,
    referenceData: UpdateReferenceDto,
  ): Promise<Reference> {
    const findReference: Reference | null = await this.reference.findUnique({
      where: { id: referenceId },
    });
    if (!findReference) {
      throw new HttpException(409, "Reference doesn't exist");
    }

    const updateReferenceData = await this.reference.update({
      where: { id: referenceId },
      data: { ...referenceData },
    });
    return updateReferenceData;
  }

  public async deleteReference(referenceId: string): Promise<Reference> {
    const findReference: Reference | null = await this.reference.findUnique({
      where: { id: referenceId },
    });

    if (!findReference) throw new HttpException(409, "Reference doesn't exist");

    const deleteReferenceData = await this.reference.delete({
      where: { id: referenceId },
    });
    return deleteReferenceData;
  }
}
