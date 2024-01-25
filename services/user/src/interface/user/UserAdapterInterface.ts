import { User } from "../../Entities/User";

export interface UserAdapterInterface {
  getUser(id: string): Promise<User | boolean>;
}
