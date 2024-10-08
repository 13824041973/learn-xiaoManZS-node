import { inject, injectable } from "inversify";
import { PrismaDB } from "../db";
import { UserDto } from "./user.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { JWT } from "../jwt";

@injectable()
export class UserService {
  // 依赖注入
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    @inject(JWT) private readonly jwt: JWT
  ) {}

  public async getUserInfo() {
    return await this.PrismaDB.prisma.user.findMany();
  }

  public async createUser(data: UserDto) {
    const user = plainToClass(UserDto, data);
    const errors = await validate(user);
    const dto = [];
    if (errors.length) {
      errors.forEach((item) => {
        Object.keys(item.constraints).forEach((key) => {
          dto.push({
            [item.property]: item.constraints[key],
          });
        });
      });
      return dto;
    } else {
      const result = await this.PrismaDB.prisma.user.create({ data: user });
      return {
        ...result,
        token: this.jwt.createToken(result)
      }
    }
  }
}
