import { User } from "../../Entities/User";

export interface AuthAdapterInterface {
  signup(userData: User): Promise<User | boolean>;
  changePassword(password: string): Promise<User>;
  fetchUserWithEmail(email: string): Promise<User | boolean>;
  fetchUserWithPhone(phone: Number): Promise<User | boolean>;
  fetchUserWithUsername(username: string): Promise<User | boolean>;
  updateUserStatusAfterEmailValidation(id: string): Promise<User | boolean>;
  resetPassword(password: string, id: string): Promise<User | boolean>;
  checkCredentialExists(
    email?: string,
    phoneNumber?: string,
    username?: string
  ): Promise<boolean>;
}
