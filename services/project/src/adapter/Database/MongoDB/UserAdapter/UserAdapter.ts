import { injectable } from "inversify";
import { UserAdapterInterface } from "../../../../interface/user/UserAdapterInterface";
import { User } from "../../../../Entities/User";
import UserModal from "../Modal/UserModal";

@injectable()
export class UserAdapter implements UserAdapterInterface {
  async getUserById(id: string): Promise<boolean | User> {
    const user = await UserModal.findById(id);

    return user as User;
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
}
