import { inject, injectable } from "inversify";
import { User } from "../Entities/User";
import { AuthInterface } from "../interface/AuthInterface";

@injectable()
export class AuthUseCase {
  constructor(@inject("AuthInterface") private authInterface: AuthInterface) {}

  signup(userData: User): Promise<User | boolean> {
    return this.authInterface.signup(userData);
  }
  changePassword(password: string): Promise<User | boolean> {
    return this.authInterface.changePassword(password);
  }
  fetchUserWithEmail(email: string): Promise<User | boolean> {
    return this.authInterface.fetchUserWithEmail(email);
  }
  fetchUserWithPhone(phone: number): Promise<User | boolean> {
    return this.authInterface.fetchUserWithPhone(phone);
  }
  fetchUserWithUsername(username: string): Promise<User | boolean> {
    return this.authInterface.fetchUserWithUsername(username);
  }
}
