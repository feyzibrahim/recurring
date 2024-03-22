import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { UserUseCaseInterface } from "../../../interface/user/UserUseCaseInterface";
import { controller, httpGet, httpPatch } from "inversify-express-utils";
import { Request, Response } from "express";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { validateJwt } from "@recurring/shared_library";
import { changePassword } from "./functions/changePassword.controller";
import { updateProfile } from "./functions/updateProfile.controller";
import { newPassword } from "./functions/newPassword.controller";
import { getUsersInOrgWithoutMe } from "./functions/getUsersInOrgWithoutMe.controller";
import { RabbitMQUseCaseInterface } from "../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import { getUsersForAdmin } from "./functions/getUsersForAdmin.controller";
import { requireSuperAdminAccess } from "../../middleware/SuperAdminMiddleware";
import { generateNewToken } from "./functions/generateNewToken.controller";

@controller("/api/user")
export class UserController {
  constructor(
    @inject(TYPES.UserUseCaseInterface)
    private iUserUseCase: UserUseCaseInterface,
    @inject(TYPES.RabbitMQUseCaseInterface)
    private iRabbitMQUseCase: RabbitMQUseCaseInterface
  ) {}

  @httpGet("/", requireAuth)
  async getUser(req: Request, res: Response) {
    try {
      const { access_token } = req.cookies;

      const data = validateJwt(
        access_token,
        process.env.ACCESS_SECRET as string
      );

      const user = await this.iUserUseCase.getUser(data.user);

      if (!user) {
        throw new Error("No user found");
      }

      return res.status(200).json({
        user,
        success: true,
        message: "User Data successfully Fetched initially",
      });
    } catch (error: any) {
      console.log(
        "file: UserController.ts:53 -> UserController -> getUser -> error",
        error
      );
      res.status(420).json({ success: false, error: error.message });
    }
  }

  @httpGet("/logout", requireAuth)
  async logoutUser(req: Request, res: Response) {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res.status(200).json({
        success: true,
        message: "User Successfully Logged Out",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  @httpPatch("/change-password", requireAuth)
  async changePassword(req: Request, res: Response) {
    await changePassword(req, res, this.iUserUseCase);
  }

  @httpPatch("/new-password", requireAuth)
  async newPassword(req: Request, res: Response) {
    await newPassword(req, res, this.iUserUseCase);
  }

  @httpPatch("/update-profile", requireAuth)
  async updateProfile(req: Request, res: Response) {
    await updateProfile(req, res, this.iUserUseCase, this.iRabbitMQUseCase);
  }

  @httpGet("/in-org-without-me", requireAuth)
  async getUsersInOrgWithoutMe(req: Request, res: Response) {
    await getUsersInOrgWithoutMe(req, res, this.iUserUseCase);
  }

  @httpGet("/admin", requireSuperAdminAccess)
  async getUsersForAdmin(req: Request, res: Response) {
    await getUsersForAdmin(req, res, this.iUserUseCase);
  }
  @httpGet("/new-token")
  async generateNewToken(req: Request, res: Response) {
    await generateNewToken(req, res, this.iUserUseCase);
  }
}
