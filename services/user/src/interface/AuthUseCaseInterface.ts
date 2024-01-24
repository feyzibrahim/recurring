import { User } from "../Entities/User";

export interface AuthUseCaseInterface {
  signup(userData: User): Promise<User | boolean>;
  changePassword(password: string): Promise<User | boolean>;
  fetchUserWithEmail(email: string): Promise<User | boolean>;
  fetchUserWithUsername(username: string): Promise<User | boolean>;
}
