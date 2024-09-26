import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { UserController } from "./src/user/controller";
import { UserService } from "./src/user/service";
import { PrismaClient } from "@prisma/client";
import { PrismaDB } from "./src/db";
import { JWT } from "./src/jwt";

const container = new Container(); // Ioc搞个容器

// prisma依赖注入
container.bind<PrismaClient>("PrismaClient").toFactory(() => {
  return () => new PrismaClient();
});
container.bind(PrismaDB).toSelf();

// user模块
container.bind(UserService).to(UserService);
container.bind(UserController).to(UserController);

// jwt模块
container.bind(JWT).to(JWT);

const server = new InversifyExpressServer(container); // server
// 中间件编写
server.setConfig((app) => {
  app.use(express.json());
  app.use(container.get(JWT).init());
});

const app = server.build(); // app 就是 express
app.listen(3000, () => {
  console.log("server listening on port 3000");
});

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}
