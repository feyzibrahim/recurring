import { injectable } from "inversify";
import { User } from "../../../Entities/User";
import UserModal from "./Modal/UserModal";
import { AuthAdapterInterface } from "../../../interface/auth/AuthAdapterInterface";

@injectable()
export class AuthAdapter implements AuthAdapterInterface {
  async changePassword(password: string): Promise<User> {
    const user = await UserModal.findOne({ password });

    return user as User;
  }

  async signup(userData: User): Promise<User | boolean> {
    try {
      const user = await UserModal.create(userData);
      return user;
    } catch (error) {
      console.log("Log: AuthAdapter -> signup -> error", error);
      return false;
    }
  }

  async fetchUserWithEmail(email: string): Promise<User | boolean> {
    try {
      const user = await UserModal.findOne({ email });
      if (!user) {
        throw new Error("Cannot find user");
      }
      return user as User;
    } catch (error: any) {
      console.log(
        "Log: AuthAdapter -> fetchUserWithEmail -> error",
        error.message
      );
      return false;
    }
  }

  async fetchUserWithPhone(phoneNumber: number): Promise<boolean | User> {
    try {
      const user = await UserModal.findOne({ phoneNumber });
      if (!user) {
        throw new Error("Cannot find user");
      }
      return user as User;
    } catch (error: any) {
      console.log(
        "Log: AuthAdapter -> fetchUserWithPhone -> error",
        error.message
      );
      return false;
    }
  }

  async fetchUserWithUsername(username: string): Promise<boolean | User> {
    try {
      const user = await UserModal.findOne({ username });
      if (!user) {
        throw new Error("Cannot find user");
      }
      return user as User;
    } catch (error: any) {
      console.log(
        "Log: AuthAdapter -> fetchUserWithUsername -> error",
        error.message
      );
      return false;
    }
  }

  async updateUserStatusAfterEmailValidation(
    id: string
  ): Promise<boolean | User> {
    try {
      const user = await UserModal.findOneAndUpdate(
        { _id: id },
        { $set: { isEmailVerified: true } }
      );

      return user as User;
    } catch (error: any) {
      console.log(
        "Log: AuthAdapter -> updateUserStatusAfterEmailValidation -> error",
        error.message
      );
      return false;
    }
  }

  async resetPassword(
    password: string,
    email: string
  ): Promise<boolean | User> {
    try {
      const user = await UserModal.findOneAndUpdate(
        { email: email },
        { $set: { password: password } }
      );

      return user as User;
    } catch (error: any) {
      console.log("Log: AuthAdapter -> resetPassword -> error", error.message);
      return false;
    }
  }
}
