import { User } from "../../Entities/User";

export interface UserAdapterInterface {
  getUserById(id: string): Promise<User | boolean>;
  updateUser(user: User): Promise<User | boolean>;
}
