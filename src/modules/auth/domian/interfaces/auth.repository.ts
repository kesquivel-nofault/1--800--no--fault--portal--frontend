import { User } from "./user.interface";

export interface AuthRepository {
  validateEmail(email: string): Promise<User | undefined>;
  generateCode(email: string): Promise<string>;
  verifyCode(email: string, code: string): Promise<boolean>;
  resetAuth(): Promise<void>;
}
