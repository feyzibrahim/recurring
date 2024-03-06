import { injectable } from "inversify";
import { UserAdapterInterface } from "../../../interface/user/UserAdapterInterface";
import { User } from "../../../Entities/User";
import UserModal from "./Modal/UserModal";

@injectable()
export class UserAdapter implements UserAdapterInterface {
  async getUser(id: string): Promise<boolean | User> {
    const user = await UserModal.findById(id);

    return user as User;
  }

  async changePassword(id: string, password: string): Promise<boolean | User> {
    try {
      const user = await UserModal.findOneAndUpdate(
        { _id: id },
        { $set: { password: password } }
      );

      return user as User;
    } catch (error) {
      console.log("Log: UserAdapter -> changePassword -> error", error);
      return false;
    }
  }

  async updateUser(user: User): Promise<boolean | User> {
    try {
      const newUser = await UserModal.findOneAndUpdate(
        { _id: user._id },
        { $set: { ...user } },
        { new: true, upsert: true }
      );

      return newUser as User;
    } catch (error) {
      console.log("Log: UserAdapter -> changePassword -> error", error);
      return false;
    }
  }

  async createEmployee(employee: User): Promise<boolean | User> {
    try {
      const newEmployee = await UserModal.create(employee);

      return newEmployee;
    } catch (error) {
      console.log("Log: UserAdapter -> createEmployee -> error", error);
      return false;
    }
  }

  async getUsersInOrgWithoutMe(
    organizationId: string,
    userId: string
  ): Promise<boolean | User[]> {
    try {
      const users = await UserModal.find(
        {
          _id: { $ne: userId },
          organization: organizationId,
        },
        {
          profileImageURL: 1,
          firstName: 1,
          lastName: 1,
          username: 1,
          email: 1,
          phoneNumber: 1,
        }
      );

      return users;
    } catch (error) {
      console.log("Log: UserAdapter -> createEmployee -> error", error);
      return false;
    }
  }

  async getUsersForAdmin(role: string): Promise<boolean | User[]> {
    const user = await UserModal.find({ role: role });

    return user as User[];
  }
}
