import { Router } from "express";
import { OrderController } from "@controllers/orders.controller";
import { CreateOrderDto } from "@dtos/orders.dto";
import { Routes } from "@interfaces/routes.interface";
import { validationMiddleware } from "@/middlewares/validation.middleware";

export class OrderRoute implements Routes {
  public path = "/orders";
  public router = Router();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.order.getOrders);
    this.router.get(`${this.path}/:id(\\d+)`, this.order.getOrderById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateOrderDto),
      this.order.createOrder,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateOrderDto, true),
      this.order.updateOrder,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.order.deleteOrder);
  }
}
