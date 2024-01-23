import { BaseAPI } from "@/src/api/class/baseApi";
import type {
  Relevance,
  AssignRelevanceBody,
  ReassignRelevanceBody,
  UnassignRelevanceBody,
  ReassignRelevanceResponse,
} from "@/src/api/interface/relevance.interface";
import type { Response } from "@/src/api/interface/base.interface";

export class RelevancesApi extends BaseAPI {
  public async relevancesAssignPut(
    body: AssignRelevanceBody,
  ): Promise<Response<Relevance[]>> {
    const res = await fetch(`${this.basePath}/relevances/assign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Relevance[]>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async relevancesReassignPut(
    body: ReassignRelevanceBody,
  ): Promise<Response<ReassignRelevanceResponse>> {
    const res = await fetch(`${this.basePath}/relevances/reassign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<ReassignRelevanceResponse>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async relevancesUnassignPut(
    body: UnassignRelevanceBody,
  ): Promise<Response<number>> {
    const res = await fetch(`${this.basePath}/relevances/unassign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<number>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }
}
