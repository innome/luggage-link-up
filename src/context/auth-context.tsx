import { createContext, useContext, useState, ReactNode } from "react";

export interface MockUser {
  email: string;
  password: string;
  name: string;
}

const MOCK_USERS: MockUser[] = [
  { email: "usuario1@maletaista.com", password: "123456", name: "Carlos García" },
  { email: "usuario2@maletaista.com", password: "123456", name: "María López" },
];

interface AuthContextType {
  user: MockUser | null;
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
  const [user, setUser] = useState<MockUser | null>(null);

  const login = (email: string, password: string): string | null => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return null;
    }
    return "Email o contraseña incorrectos.";
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
