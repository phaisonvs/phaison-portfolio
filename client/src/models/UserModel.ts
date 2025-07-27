import { User } from "@shared/schema";

export class UserModel {
  static getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  static getDisplayName(user: User): string {
    return user.name || 'Usuário';
  }

  static hasAvatar(user: User): boolean {
    return Boolean(user.avatarUrl);
  }
}