import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminService, type AdminUser } from '@/services/adminService';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ token: string; admin: AdminUser }>;
  logout: () => void;
  refreshUser: () => Promise<AdminUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(adminService.getUser());
  const [token, setToken] = useState<string | null>(adminService.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = useCallback(() => {
    adminService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const verified = await adminService.verifyAuth();
      if (verified) {
        setUser(verified);
        setToken(adminService.getToken());
        return verified;
      } else {
        logout();
        return null;
      }
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (adminService.getToken()) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, [refreshUser]);

  const login = async (email: string, pass: string) => {
    const res = await adminService.login(email, pass);
    setUser(res.admin);
    setToken(res.token);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
