import { Router } from "express";
import { OrderController } from "@/controllers/order.controller";
import { createOrderDto, updateOrderDto } from "@/dtos/order.dto";
import { Routes } from "@/interfaces/routes.interface";
import { validationRequestBodyMiddleware } from "@/middlewares/validation.middleware";

export class OrderRoute implements Routes {
  public path = "/orders";
  public router = Router();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.order.getOrders);
    this.router.get(`${this.path}/:id`, this.order.getOrderById);
    this.router.post(
      `${this.path}`,
      validationRequestBodyMiddleware(createOrderDto),
      this.order.createOrder,
    );
    this.router.put(
      `${this.path}/:id`,
      validationRequestBodyMiddleware(updateOrderDto),
      this.order.updateOrder,
    );
    this.router.delete(`${this.path}/:id`, this.order.deleteOrder);
  }
}
