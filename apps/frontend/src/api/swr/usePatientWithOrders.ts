import type { KeyedMutator } from "swr";
import useSWR from "swr";
import { useMemo } from "react";
import type { PatientWithOrders } from "@/src/api/interface/patient.interface";
import { PatientsApi } from "@/src/api/class/patientsApi";

export interface Key {
  patientsApi: PatientsApi;
}

export interface ReturnType {
  patientWithOrders: PatientWithOrders[] | undefined;
  isValidating: boolean;
  error: Error | undefined;
  mutatePatientWithOrders: KeyedMutator<PatientWithOrders[]>;
}

async function fetcher({ patientsApi }: Key): Promise<PatientWithOrders[]> {
  const response = await patientsApi.patientsGet();
  return response.data;
}

export function usePatientWithOrders(): ReturnType {
  const patientsApi = useMemo(() => new PatientsApi(), []);

  const { data, isValidating, error, mutate } = useSWR<
    PatientWithOrders[],
    Error
  >({ patientsApi }, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    patientWithOrders: data,
    isValidating,
    error,
    mutatePatientWithOrders: mutate,
  };
}
