import { AuthRepository } from "../../domian/interfaces/auth.repository";
import { User } from "../../domian/interfaces/user.interface";
import { mockUsers } from "../mocks/mock-users";

export class MockAuthRepository implements AuthRepository {
  async validateEmail(email: string): Promise<User | undefined> {
    const exists = mockUsers.find((u) => u.email === email);
    return exists;
  }

  async generateCode(email: string): Promise<string> {
    const user = mockUsers.find((u) => u.email === email);
    if (!user) throw new Error("Email not found");
    console.log(`Mock code sent to ${email}: ${user.code}`);
    return user.code;
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const user = mockUsers.find((u) => u.email === email && u.code === code);
    return !!user;
  }

  async resetAuth(): Promise<void> {
    return;
  }
}
