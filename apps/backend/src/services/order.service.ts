import { Service } from "typedi";
import type {
  CreateOrderDto,
  CreatePatientOrderDto,
  FindManyOrderArgsDto,
  UpdateOrderDto,
} from "@/dtos/order.dto";
import { HttpException } from "@/exceptions/httpException";
import type { Order } from "@/interfaces/order.interface";
import prisma from "@/prisma/client";

@Service()
export class OrderService {
  public order = prisma.order;
  public relevance = prisma.relevance;

  public async findManyOrder(args?: FindManyOrderArgsDto): Promise<Order[]> {
    const allOrder = await this.order.findMany(
      args
        ? {
            where: {
              id: { in: args.ids },
            },
          }
        : undefined,
    );
    return allOrder;
  }

  public async findOrderById(orderId: string): Promise<Order> {
    const findOrder: Order | null = await this.order.findUnique({
      where: { id: orderId },
    });

    if (!findOrder) {
      throw new HttpException(409, "Order doesn't exist");
    }

    return findOrder;
  }

  public async createOrder(orderData: CreateOrderDto): Promise<Order> {
    // const findOrder: Order | null = await this.order.findFirst({
    //   where: { name: orderData.name },
    // });
    // if (findOrder)
    //   throw new HttpException(
    //     409,
    //     `This email ${orderData.email} already exists`,
    //   );

    const createOrderData: Order = await this.order.create({
      data: { ...orderData },
    });
    return createOrderData;
  }

  public async updateOrder(
    orderId: string,
    orderData: UpdateOrderDto,
  ): Promise<Order> {
    const findOrder: Order | null = await this.order.findUnique({
      where: { id: orderId },
    });
    if (!findOrder) {
      throw new HttpException(409, "Order doesn't exist");
    }

    const updateOrderData = await this.order.update({
      where: { id: orderId },
      data: { ...orderData },
    });
    return updateOrderData;
  }

  public async deleteOrder(orderId: string): Promise<Order> {
    const findOrder: Order | null = await this.order.findUnique({
      where: { id: orderId },
    });

    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    const deleteOrderData = await this.order.delete({
      where: { id: orderId },
    });
    return deleteOrderData;
  }

  public async createPatientOrder({
    patientId,
    ...orderData
  }: CreatePatientOrderDto): Promise<Order> {
    const createPatientOrderData = await prisma.$transaction(async (tx) => {
      const createOrderData: Order = await tx.order.create({
        data: { ...orderData },
      });

      await tx.relevance.create({
        data: {
          type: "PatientOrder",
          first_id: patientId,
          second_id: createOrderData.id,
          third_id: "",
        },
      });

      return createOrderData;
    });

    return createPatientOrderData;
  }
}
