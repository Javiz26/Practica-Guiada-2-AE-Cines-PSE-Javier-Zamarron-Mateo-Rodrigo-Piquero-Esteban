import api from '../middleware/api'; 
import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from "../types/JwtPayload";
import type { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState<string | null>(storedToken);
  const [user, setUser] = useState<JwtPayload | null>(
    storedToken ? jwtDecode<JwtPayload>(storedToken) : null
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const newtoken = response.data.token;
      
      localStorage.setItem('token', newtoken);
      setToken(newtoken);
      setUser(jwtDecode<JwtPayload>(newtoken));
    } 
    catch (error) {
      console.error('Login failed:', error);
      throw error; 
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout } as any}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};

export default AuthProvider;