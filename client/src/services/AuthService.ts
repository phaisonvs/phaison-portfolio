import { apiRequest } from "@/lib/queryClient";
import { User, InsertUser } from "@shared/schema";

export class AuthService {
  static async login(credentials: { username: string; password: string }): Promise<User> {
    const response = await apiRequest("POST", "/api/login", credentials);
    return response.json();
  }

  static async logout(): Promise<void> {
    await apiRequest("POST", "/api/logout");
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch('/api/user');
      if (response.status === 401) return null;
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    } catch {
      return null;
    }
  }

  static async register(userData: InsertUser): Promise<User> {
    const response = await apiRequest("POST", "/api/register", userData);
    return response.json();
  }
}