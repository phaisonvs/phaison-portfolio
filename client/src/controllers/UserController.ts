import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { UserModel } from "@/models/UserModel";

export class UserController {
  static useAuthController() {
    const auth = useAuth();
    
    return {
      user: auth.user,
      isLoading: auth.isLoading,
      error: auth.error,
      login: auth.loginMutation,
      logout: auth.logoutMutation,
      register: auth.registerMutation,
      isAuthenticated: Boolean(auth.user),
      getUserDisplayName: () => auth.user ? UserModel.getDisplayName(auth.user) : '',
      getUserInitials: () => auth.user ? UserModel.getInitials(auth.user.name) : '',
    };
  }
}