import { User } from "../Entities/User";

export interface AuthAdapterInterface {
  signup(userData: User): Promise<User | boolean>;
  changePassword(password: string): Promise<User>;
  fetchUserWithEmail(email: string): Promise<User | boolean>;
  fetchUserWithPhone(phone: Number): Promise<User | boolean>;
  fetchUserWithUsername(username: string): Promise<User | boolean>;
}
