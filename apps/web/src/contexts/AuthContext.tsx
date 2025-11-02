"use client";

import { createContext, use, useOptimistic, useTransition } from "react";
import { useLocalStorage } from "@/components/ui";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "basic" | "premium" | "enterprise";
  permissions: string[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [storedUser, setStoredUser] = useLocalStorage<User | null>("user", null);
  const [isPending, startTransition] = useTransition();
  
  const [optimisticState, setOptimisticState] = useOptimistic(
    { user: storedUser, isLoading: false, error: null },
    (state: AuthState, action: { type: string; payload?: any }) => {
      switch (action.type) {
        case "LOGIN_START":
          return { ...state, isLoading: true, error: null };
        case "LOGIN_SUCCESS":
          return { user: action.payload, isLoading: false, error: null };
        case "LOGIN_ERROR":
          return { ...state, isLoading: false, error: action.payload };
        case "LOGOUT":
          return { user: null, isLoading: false, error: null };
        case "UPDATE_USER":
          return { ...state, user: action.payload };
        default:
          return state;
      }
    }
  );

  const login = async (email: string, password: string) => {
    startTransition(async () => {
      setOptimisticState({ type: "LOGIN_START" });
      
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error("Credenciales inválidas");

        const userData = await response.json();
        setStoredUser(userData);
        setOptimisticState({ type: "LOGIN_SUCCESS", payload: userData });
      } catch (error) {
        setOptimisticState({ 
          type: "LOGIN_ERROR", 
          payload: error instanceof Error ? error.message : "Error de login" 
        });
      }
    });
  };

  const logout = async () => {
    startTransition(async () => {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (error) {
        console.warn("Error during logout:", error);
      } finally {
        setStoredUser(null);
        setOptimisticState({ type: "LOGOUT" });
      }
    });
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!optimisticState.user) return;

    const updatedUser = { ...optimisticState.user, ...userData };
    
    startTransition(async () => {
      setOptimisticState({ type: "UPDATE_USER", payload: updatedUser });
      
      try {
        await fetch("/api/user/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        
        setStoredUser(updatedUser);
      } catch (error) {
        // Revert optimistic update on error
        setOptimisticState({ type: "UPDATE_USER", payload: optimisticState.user });
      }
    });
  };

  const hasPermission = (permission: string): boolean => {
    return optimisticState.user?.permissions.includes(permission) || false;
  };

  const contextValue: AuthContextType = {
    ...optimisticState,
    isLoading: optimisticState.isLoading || isPending,
    login,
    logout,
    updateUser,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}