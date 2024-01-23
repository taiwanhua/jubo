import { BaseAPI } from "@/src/api/class/baseApi";
import type {
  Patient,
  PatientBody,
  PatientWithOrders,
} from "@/src/api//interface/patient.interface";
import type { Response } from "@/src/api/interface/base.interface";

export class PatientsApi extends BaseAPI {
  public async patientsGet(): Promise<Response<PatientWithOrders[]>> {
    const res = await fetch(`${this.basePath}/patients`).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<PatientWithOrders[]>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async patientsIdDelete(id: string): Promise<Response<Patient>> {
    const res = await fetch(`${this.basePath}/patients/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Patient>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async patientsIdGet(id: string): Promise<Response<Patient>> {
    const res = await fetch(`${this.basePath}/patients/${id}`).then(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json() as unknown as Response<Patient>;
        }

        throw new Error(response.statusText);
      },
    );

    return res;
  }

  public async patientsIdPut(
    id: string,
    body: PatientBody,
  ): Promise<Response<Patient>> {
    const res = await fetch(`${this.basePath}/patients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Patient>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async patientsPost(body: PatientBody): Promise<Response<Patient>> {
    const res = await fetch(`${this.basePath}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Patient>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }
}
