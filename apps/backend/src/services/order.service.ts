import { Service } from "typedi";
import type { CreateOrderDto, UpdateOrderDto } from "@/dtos/order.dto";
import { HttpException } from "@/exceptions/httpException";
import type { Order } from "@/interfaces/order.interface";
import { prisma } from "@/prisma/client";

@Service()
export class OrderService {
  // public order = new PrismaClient().order;
  public order = prisma.order;

  public async findAllOrder(): Promise<Order[]> {
    const allOrder = await this.order.findMany();
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
}
