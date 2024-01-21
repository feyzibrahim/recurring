import { injectable } from "inversify";
import { User } from "../../../Entities/User";
import { UserInterface } from "../../../interface/UserInterface";
import UserModal from "./Modal/UserModal";

@injectable()
export class UserAdapter implements UserInterface {
  async getUsers(): Promise<User[]> {
    const users = await UserModal.find({});
    return users;
  }

  async createUser(userData: User): Promise<User> {
    const user = await UserModal.create(userData);
    return user;
  }

  // Deleting all users from DB
  async deleteAllUser(): Promise<boolean> {
    try {
      await UserModal.deleteMany({});
      return true;
    } catch (error) {
      return false;
    }
  }

  // Fetching a user with email
  async fetchUserWithEmail(email: string): Promise<User | boolean> {
    try {
      const user = await UserModal.findOne({ email });
      if (!user) {
        throw new Error("Cannot find user");
      }
      return user as User;
    } catch (error) {
      return false;
    }
  }
}
