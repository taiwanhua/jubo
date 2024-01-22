import "reflect-metadata";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import type { Application } from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@/config";
import type { Routes } from "@/interfaces/routes.interface";
import { ErrorMiddleware } from "@/middlewares/error.middleware";
import { logger, stream } from "@/utils/logger";

export class App {
  public app: Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan(LOG_FORMAT ?? "tiny", { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeSwagger(): void {
    const options = {
      swaggerDefinition: {
        // OAS 2.0
        // https://editor.swagger.io/
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
      // apis: [`${__dirname}/routes/*.ts`],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", serve, setup(specs));
  }

  private initializeErrorHandling(): void {
    this.app.use(ErrorMiddleware);
  }
}
