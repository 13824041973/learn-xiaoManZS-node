import type { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "./service";

@controller("/user") // 路由
export class UserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  @httpGet("/index")
  public async getIndex(req: Request, res: Response) {
    const result = await this.userService.getUserInfo();
    res.send(result);
  }

  @httpPost("/create")
  public async createUser(req: Request, res: Response) {
    const result = await this.userService.createUser(req.body);
    res.send(result);
  }
}
