import { inject, injectable } from "inversify";
import { User } from "../Entities/User";
import { AuthUseCaseInterface } from "../interface/auth/AuthUseCaseInterface";
import { TYPES } from "../constants/types/types";

@injectable()
export class AuthUseCase implements AuthUseCaseInterface {
  constructor(
    @inject(TYPES.AuthAdapterInterface)
    private iAuthUseCase: AuthUseCaseInterface
  ) {}

  signup(userData: User): Promise<User | boolean> {
    return this.iAuthUseCase.signup(userData);
  }
  changePassword(password: string): Promise<User | boolean> {
    return this.iAuthUseCase.changePassword(password);
  }
  fetchUserWithEmail(email: string): Promise<User | boolean> {
    return this.iAuthUseCase.fetchUserWithEmail(email);
  }

  fetchUserWithUsername(username: string): Promise<User | boolean> {
    return this.iAuthUseCase.fetchUserWithUsername(username);
  }
}
