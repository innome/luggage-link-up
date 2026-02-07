import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { checkPassword, readUsers } from "@/lib/user-storage";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => null,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string): string | null => {
    const emailNorm = email.trim().toLowerCase();
    const users = readUsers();
    const stored = users.find((u) => u.email === emailNorm);
    if (!stored || !checkPassword(password, stored.passwordHash)) {
      return "Email o contraseña incorrectos.";
    }
    setUser({ id: stored.id, email: stored.email, name: stored.name });
    return null;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
