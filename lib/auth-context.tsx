"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "github";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithOAuth: (provider: "google" | "github") => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Get existing users
      const usersData = localStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In production, this should be hashed
        provider: "email" as const,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login after signup
      const authUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        provider: newUser.provider,
      };
      setUser(authUser);
      localStorage.setItem("auth_user", JSON.stringify(authUser));

      return true;
    } catch (error) {
      console.error("[v0] Signup error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersData = localStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        const authUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          provider: user.provider || "email",
        };
        setUser(authUser);
        localStorage.setItem("auth_user", JSON.stringify(authUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error("[v0] Login error:", error);
      return false;
    }
  };

  const loginWithOAuth = async (
    provider: "google" | "github"
  ): Promise<boolean> => {
    try {
      // Simulate OAuth flow (in production, this would redirect to OAuth provider)
      // For demo purposes, we'll create a mock user based on the provider

      const mockUsers = {
        google: {
          id: `google_${Date.now()}`,
          name: "Google User",
          email: "user@gmail.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
          provider: "google" as const,
        },
        github: {
          id: `github_${Date.now()}`,
          name: "GitHub User",
          email: "user@github.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=github",
          provider: "github" as const,
        },
      };

      const newUser = mockUsers[provider];

      // Check if OAuth user already exists
      const usersData = localStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      const existingUser = users.find(
        (u: any) => u.email === newUser.email && u.provider === provider
      );

      if (!existingUser) {
        // Store new OAuth user
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
      }

      // Set authenticated user
      const authUser = existingUser || newUser;
      setUser(authUser);
      localStorage.setItem("auth_user", JSON.stringify(authUser));

      return true;
    } catch (error) {
      console.error("[v0] OAuth login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithOAuth,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
