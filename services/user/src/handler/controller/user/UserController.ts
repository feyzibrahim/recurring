import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { UserUseCaseInterface } from "../../../interface/user/UserUseCaseInterface";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
// import { User } from "../../../Entities/User";
import { Request, Response } from "express";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { validateJwt } from "../../../util/JWT/validate.jwt";
import { changePassword } from "./functions/changePassword.controller";
import { updateProfile } from "./functions/updateProfile.controller";

@controller("/api/user")
export class UserController {
  constructor(
    @inject(TYPES.UserUseCaseInterface)
    private iUserUseCase: UserUseCaseInterface
  ) {}

  @httpGet("/", requireAuth)
  async getUser(req: Request, res: Response) {
    try {
      const { access_token } = req.cookies;

      const data = validateJwt(access_token);
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
      res.status(400).json({ success: false, error: error.message });
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

  @httpPatch("/update-profile", requireAuth)
  async updateProfile(req: Request, res: Response) {
    await updateProfile(req, res, this.iUserUseCase);
  }
}
