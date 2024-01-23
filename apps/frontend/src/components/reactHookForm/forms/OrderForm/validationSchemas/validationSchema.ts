import * as yup from "yup";
import type { PatientWithOrders } from "@/src/api/interface/patient.interface";

export const validationSchema: yup.ObjectSchema<PatientWithOrders> = yup
  .object({
    id: yup.string().required(),
    name: yup.string().required(),
    created_user: yup.string().required(),
    created_date: yup.date().required(),
    updated_user: yup.string().required(),
    updated_date: yup.date().required(),
    orders: yup
      .array()
      .of(
        yup.object({
          id: yup.string().required(),
          message: yup
            .string()
            .required("請輸入醫生叮囑")
            .max(255, "最多255字"),
          created_user: yup.string().required(),
          created_date: yup.date().required(),
          updated_user: yup.string().required(),
          updated_date: yup.date().required(),
        }),
      )
      .required(),
  })
  .required();
