import { User } from "../../Entities/User";

export interface UserUseCaseInterface {
  getUserById(id: string): Promise<User | boolean>;
}
