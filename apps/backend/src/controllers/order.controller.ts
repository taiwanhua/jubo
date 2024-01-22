import type { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import type { Order } from "@/interfaces/order.interface";
import { OrderService } from "@/services/order.service";
import type {
  CreateOrderDto,
  CreatePatientOrderDto,
  UpdateOrderDto,
} from "@/dtos/order.dto";
import { HttpException } from "@/exceptions/httpException";

export class OrderController {
  public order = Container.get(OrderService);

  public getOrders = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findManyOrdersData: Order[] = await this.order.findManyOrder();

      res.status(200).json({ data: findManyOrdersData, message: "findMany" });
    } catch (error) {
      next(error);
    }
  };

  public getOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const orderId = req.params.id;

      if (!orderId) {
        throw new HttpException(400, "Id is required");
      }

      const findOneOrderData: Order = await this.order.findOrderById(orderId);

      res.status(200).json({ data: findOneOrderData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const orderData = req.body as CreateOrderDto;
      const createOrderData: Order = await this.order.createOrder(orderData);

      res.status(201).json({ data: createOrderData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const orderId = req.params.id;

      if (!orderId) {
        throw new HttpException(400, "Id is required");
      }

      const orderData = req.body as UpdateOrderDto;
      const updateOrderData: Order = await this.order.updateOrder(
        orderId,
        orderData,
      );

      res.status(200).json({ data: updateOrderData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const orderId = req.params.id;

      if (!orderId) {
        throw new HttpException(400, "Id is required");
      }

      const deleteOrderData: Order = await this.order.deleteOrder(orderId);

      res.status(200).json({ data: deleteOrderData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public createPatientOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const orderData = req.body as CreatePatientOrderDto;
      const createPatientOrderData: Order = await this.order.createPatientOrder(
        orderData,
      );

      res
        .status(201)
        .json({ data: createPatientOrderData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}
