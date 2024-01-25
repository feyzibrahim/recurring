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
}
