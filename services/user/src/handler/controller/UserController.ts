import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
} from "inversify-express-utils";
import { UserUseCase } from "../../useCases/UserUseCase";
import { inject } from "inversify";
import { User } from "../../Entities/User";

@controller("/users")
export class UserController {
  constructor(@inject(UserUseCase) private userUserCase: UserUseCase) {}
  @httpGet("/")
  async getUsers(_: Request, res: Response) {
    try {
      const users = await this.userUserCase.getUsers();

      if (!users || users.length < 1) {
        throw new Error("No users registered");
      }

      return res.status(200).json({
        users,
        success: true,
        message: "Users details successfully fetched",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  @httpPost("/")
  async createUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;

      const exists = await this.userUserCase.fetchUserWithEmail(userData.email);

      if (exists) {
        throw new Error("User already registered");
      }

      const user = await this.userUserCase.createUser(userData);
      if (!user) {
        throw new Error("Couldn't create a new user");
      }
      return res.json({
        user,
        success: true,
        message: "Users details successfully fetched",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  @httpDelete("/delete-all")
  async deleteUsers(_: Request, res: Response) {
    try {
      const data = await this.userUserCase.deleteAllUser();
      if (!data) {
        throw new Error("Users are not deleted");
      }
      res.status(200).json({ success: true, message: "All users deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
