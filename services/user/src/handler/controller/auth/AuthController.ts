import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { AuthUseCase } from "../../../useCases/AuthUseCase";
import { inject } from "inversify";
import { User } from "../../../Entities/User";
import validateUser from "../../../util/validation/signup.validate";
import hashPassword from "../../../util/hash/password.hash";
import validateUserOnLogin from "../../../util/validation/login.validate";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
} from "../../../util/JWT/create.jwt";

const cookieConfig = {
  secure: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
};

@controller("/auth")
export class AuthController {
  constructor(@inject(AuthUseCase) private authUseCase: AuthUseCase) {}

  // User Login Function

  @httpPost("/login")
  async login(req: Request, res: Response) {
    const userData: any = req.body;

    try {
      let user: User | boolean = await validateUserOnLogin(
        userData,
        this.authUseCase
      );

      // Setting JWT Tokens
      const access_token = createJwtAccessToken(user);
      const refresh_token = createJwtRefreshToken(user);
      res.cookie("access_token", access_token, cookieConfig);
      res.cookie("refresh_token", refresh_token, cookieConfig);

      return res.status(200).json({
        user: user,
        success: true,
        message: "Users successfully Logged In",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // User Signup Function
  @httpPost("/signup")
  async signup(req: Request, res: Response) {
    const userData: any = req.body;

    try {
      // Validate Password
      let user = await validateUser(userData, this.authUseCase);

      // Hash Password
      user = await hashPassword(user);

      // Registering User to DB
      const newUser: User | boolean = await this.authUseCase.signup(user);

      if (!newUser) {
        throw new Error("Cannot Signup Now! Please try Later");
      }

      // Setting JWT Tokens
      const access_token = createJwtAccessToken(user);
      const refresh_token = createJwtRefreshToken(user);
      res.cookie("access_token", access_token, cookieConfig);
      res.cookie("refresh_token", refresh_token, cookieConfig);

      return res.status(200).json({
        user: newUser,
        success: true,
        message: "Users successfully Registered",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
