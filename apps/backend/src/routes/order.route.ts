import { Router } from "express";
import { OrderController } from "@/controllers/order.controller";
import { createOrderDto, updateOrderDto } from "@/dtos/order.dto";
import type { Routes } from "@/interfaces/routes.interface";
import { validationRequestBodyMiddleware } from "@/middlewares/validation.middleware";
import { asyncWrapper } from "@/utils/asyncWrapper";

export class OrderRoute implements Routes {
  public path = "/orders";
  public router = Router();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, asyncWrapper(this.order.getOrders));
    this.router.get(`${this.path}/:id`, asyncWrapper(this.order.getOrderById));
    this.router.post(
      this.path,
      validationRequestBodyMiddleware(createOrderDto),
      asyncWrapper(this.order.createOrder),
    );
    this.router.put(
      `${this.path}/:id`,
      validationRequestBodyMiddleware(updateOrderDto),
      asyncWrapper(this.order.updateOrder),
    );
    this.router.delete(
      `${this.path}/:id`,
      asyncWrapper(this.order.deleteOrder),
    );
  }
}
