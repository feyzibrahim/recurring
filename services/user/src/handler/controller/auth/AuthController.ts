import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { AuthUseCase } from "../../../useCases/AuthUseCase";
import { inject } from "inversify";
import { User } from "../../../Entities/User";
import validateUser from "../../../util/validation/signup.validate";
import hashPassword from "../../../util/hash/password.hash";

@controller("/auth")
export class AuthController {
  constructor(@inject(AuthUseCase) private authUseCase: AuthUseCase) {}
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

      return res.status(200).json({
        user: user,
        success: true,
        message: "Users successfully Registered",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
