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
import { verifyPasswordReset } from "./functions/verifyPasswordReset.controller";
import { resetPassword } from "./functions/resetPassword.controller";
import { checkCredentials } from "./functions/checkCredentials.controller";
import { OrganizationUseCaseInterface } from "../../../interface/organization/OrganizationUseCaseInterface";
import { RabbitMQUseCaseInterface } from "../../../interface/rabbitmq/RabbitMQUseCaseInterface";

@controller("/api/auth")
export class AuthController {
  constructor(
    @inject(TYPES.AuthUseCaseInterface)
    private iAuthUseCase: AuthUseCaseInterface,
    @inject(TYPES.OrganizationUseCaseInterface)
    private iOrgUseCase: OrganizationUseCaseInterface,
    @inject(TYPES.RabbitMQUseCaseInterface)
    private iRabbitMQUseCase: RabbitMQUseCaseInterface
  ) {}

  // User Login Function
  @httpPost("/login")
  async login(req: Request, res: Response) {
    await login(req, res, this.iAuthUseCase);
  }

  // User Signup Function
  @httpPost("/register")
  async signup(req: Request, res: Response) {
    await signup(
      req,
      res,
      this.iAuthUseCase,
      this.iOrgUseCase,
      this.iRabbitMQUseCase
    );
  }

  // Google Sign Up
  @httpPost("/google")
  async googleSignup(req: Request, res: Response) {
    await googleSignup(
      req,
      res,
      this.iAuthUseCase,
      this.iRabbitMQUseCase,
      this.iOrgUseCase
    );
  }
  // Forget Password Link Sent
  @httpPost("/forgot-password")
  async forgotPassword(req: Request, res: Response) {
    await forgotPassword(req, res, this.iAuthUseCase);
  }

  // Verify Email
  @httpGet("/verify-email/:token")
  async verifyEmail(req: Request, res: Response) {
    await verifyEmail(req, res, this.iAuthUseCase, this.iRabbitMQUseCase);
  }

  // Verify Password Link
  @httpGet("/verify-password-link/:token")
  async verifyPasswordReset(req: Request, res: Response) {
    await verifyPasswordReset(req, res, this.iAuthUseCase);
  }

  // Set New Password
  @httpPost("/reset-password/:token")
  async resetPassword(req: Request, res: Response) {
    await resetPassword(req, res, this.iAuthUseCase);
  }

  @httpGet("/check-credintials")
  async checkCredentials(req: Request, res: Response) {
    await checkCredentials(req, res, this.iAuthUseCase);
  }
}
