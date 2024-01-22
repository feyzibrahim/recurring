import { injectable } from "inversify";
import { User } from "../../../Entities/User";
import { AuthInterface } from "../../../interface/AuthInterface";
import UserModal from "./Modal/UserModal";

@injectable()
export class AuthAdapter implements AuthInterface {
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
}
