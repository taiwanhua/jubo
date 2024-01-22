import { Service } from "typedi";
import type { CreatePatientDto, UpdatePatientDto } from "@/dtos/patient.dto";
import { HttpException } from "@/exceptions/httpException";
import type { Patient } from "@/interfaces/patient.interface";
import prisma from "@/prisma/client";

@Service()
export class PatientService {
  public patient = prisma.patient;

  public async findManyPatient(): Promise<Patient[]> {
    const allPatient = await this.patient.findMany();
    return allPatient;
  }

  public async findPatientById(patientId: string): Promise<Patient> {
    const findPatient: Patient | null = await this.patient.findUnique({
      where: { id: patientId },
    });

    if (!findPatient) {
      throw new HttpException(409, "Patient doesn't exist");
    }

    return findPatient;
  }

  public async createPatient(patientData: CreatePatientDto): Promise<Patient> {
    // const findPatient: Patient | null = await this.patient.findFirst({
    //   where: { name: patientData.name },
    // });
    // if (findPatient)
    //   throw new HttpException(
    //     409,
    //     `This email ${patientData.email} already exists`,
    //   );

    const createPatientData: Patient = await this.patient.create({
      data: { ...patientData },
    });
    return createPatientData;
  }

  public async updatePatient(
    patientId: string,
    patientData: UpdatePatientDto,
  ): Promise<Patient> {
    const findPatient: Patient | null = await this.patient.findUnique({
      where: { id: patientId },
    });
    if (!findPatient) {
      throw new HttpException(409, "Patient doesn't exist");
    }

    const updatePatientData = await this.patient.update({
      where: { id: patientId },
      data: { ...patientData },
    });
    return updatePatientData;
  }

  public async deletePatient(patientId: string): Promise<Patient> {
    const findPatient: Patient | null = await this.patient.findUnique({
      where: { id: patientId },
    });

    if (!findPatient) throw new HttpException(409, "Patient doesn't exist");

    const deletePatientData = await this.patient.delete({
      where: { id: patientId },
    });
    return deletePatientData;
  }
}
