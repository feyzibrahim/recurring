import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { AuthUseCaseInterface } from "../../../interface/auth/AuthUseCaseInterface";
import { TYPES } from "../../../constants/types/types";
import { googleSignup } from "./functions/googleSignup.controller";
import { login } from "./functions/login.controller";
import { signup } from "./functions/signup.controller";
import { verifyEmail } from "./functions/verifyEmail.controller";
import { forgotPassword } from "./functions/forgotPassword.controller";

@controller("/api/auth")
export class AuthController {
  constructor(
    @inject(TYPES.AuthUseCaseInterface)
    private iAuthUseCase: AuthUseCaseInterface
  ) {}

  // User Login Function
  @httpPost("/login")
  async login(req: Request, res: Response) {
    await login(req, res, this.iAuthUseCase);
  }

  // User Signup Function
  @httpPost("/register")
  async signup(req: Request, res: Response) {
    await signup(req, res, this.iAuthUseCase);
  }

  // Google Sign Up
  @httpPost("/google")
  async googleSignup(req: Request, res: Response) {
    await googleSignup(req, res, this.iAuthUseCase);
  }
  // Forget Password Link Sent
  @httpPost("/forgot-password")
  async forgotPassword(req: Request, res: Response) {
    await forgotPassword(req, res, this.iAuthUseCase);
  }

  // Verify Email
  @httpGet("/verify-email/:token")
  async verifyEmail(req: Request, res: Response) {
    await verifyEmail(req, res, this.iAuthUseCase);
  }
}
