import { User } from "../../Entities/User";

export interface UserUseCaseInterface {
  getUser(id: string): Promise<User | boolean>;
}
