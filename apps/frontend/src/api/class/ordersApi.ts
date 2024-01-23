import { BaseAPI } from "@/src/api/class/baseApi";
import type {
  Order,
  OrderBody,
  PatientOrderBody,
} from "@/src/api/interface/order.interface";
import type { Response } from "@/src/api/interface/base.interface";

export class OrdersApi extends BaseAPI {
  public async ordersGet(): Promise<Response<Order[]>> {
    const res = await fetch(`${this.basePath}/orders`).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Order[]>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async ordersIdDelete(id: string): Promise<Response<Order>> {
    const res = await fetch(`${this.basePath}/orders/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Order>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async ordersIdGet(id: string): Promise<Response<Order>> {
    const res = await fetch(`${this.basePath}/orders/${id}`).then(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json() as unknown as Response<Order>;
        }

        throw new Error(response.statusText);
      },
    );

    return res;
  }

  public async ordersIdPut(
    id: string,
    body: OrderBody,
  ): Promise<Response<Order>> {
    const res = await fetch(`${this.basePath}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Order>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async ordersPost(body: OrderBody): Promise<Response<Order>> {
    const res = await fetch(`${this.basePath}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Order>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }

  public async ordersWithPatientPost(
    body: PatientOrderBody,
  ): Promise<Response<Order>> {
    const res = await fetch(`${this.basePath}/orders/withPatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json() as unknown as Response<Order>;
      }

      throw new Error(response.statusText);
    });

    return res;
  }
}
