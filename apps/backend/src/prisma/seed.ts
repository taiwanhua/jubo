/* eslint-disable no-console -- need log */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const deletePatients = await prisma.patient.deleteMany();

  const patients = await prisma.patient.createMany({
    data: [
      { name: "陳春明" },
      { name: "王小茹" },
      { name: "花藝龍" },
      { name: "孫悟空" },
      { name: "孫物販" },
    ],
  });
  const deleteOrders = await prisma.order.deleteMany();

  const orders = await prisma.order.createMany({
    data: [
      { message: "陳春明，請好好保重" },
      { message: "王小茹，請好好保重" },
      { message: "花藝龍，請好好保重" },
      { message: "孫悟空，請好好保重" },
      { message: "孫物販，請好好保重" },
    ],
  });

  const deleteRelevances = await prisma.relevance.deleteMany();

  const patientTable = await prisma.patient.findMany();
  const orderTable = await prisma.order.findMany();

  const relevances = await prisma.relevance.createMany({
    data: [
      {
        type: "PatientOrder",
        first_id: patientTable[0]?.id ?? "",
        second_id: orderTable[0]?.id ?? "",
        third_id: "",
      },
      {
        type: "PatientOrder",
        first_id: patientTable[1]?.id ?? "",
        second_id: orderTable[1]?.id ?? "",
        third_id: "",
      },
      {
        type: "PatientOrder",
        first_id: patientTable[2]?.id ?? "",
        second_id: orderTable[2]?.id ?? "",
        third_id: "",
      },
      {
        type: "PatientOrder",
        first_id: patientTable[3]?.id ?? "",
        second_id: orderTable[3]?.id ?? "",
        third_id: "",
      },
      {
        type: "PatientOrder",
        first_id: patientTable[4]?.id ?? "",
        second_id: orderTable[4]?.id ?? "",
        third_id: "",
      },
    ],
  });
  console.log(
    deletePatients,
    patients,
    deleteOrders,
    orders,
    deleteRelevances,
    relevances,
  );
  console.log("SEED FINISHED");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
