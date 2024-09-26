import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import { injectable } from "inversify";

@injectable()
export class JWT {
  private secret = "luyolg@@@secret";
  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.secret,
  };

  constructor() {
    this.strategy();
  }

  //   初始化jwt
  public strategy() {
    const strategy = new Strategy(this.jwtOptions, (payload, done) => {
      done(null, payload);
    });
    passport.use(strategy);
  }

  // 中间件
  public middleware() {
    return passport.authenticate("jwt", { session: false });
  }

  // 创建token
  public createToken(data: object) {
    return jsonwebtoken.sign(data, this.secret, { expiresIn: "7d" });
  }

  // 集成到express
  public init() {
    return passport.initialize();
  }
}
