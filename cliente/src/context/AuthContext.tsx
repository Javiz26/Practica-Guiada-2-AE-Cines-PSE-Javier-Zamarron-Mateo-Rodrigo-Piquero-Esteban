import axios from "axios";
import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from "../types/JwtPayload";
import type { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType | null>(null);


function AuthProvider({ children }: { children: React.ReactNode }) {
  
  // Al cargar la app, intentamos recuperar el token del localStorage para mantener la sesión iniciada
  const storedToken = localStorage.getItem('token')

  
  const [token, setToken] = useState<string | null>(storedToken)

  //si hay storedToken, lo decodifica y lo usa como usuario inicial
  const [user, setUser] = useState<JwtPayload | null>(storedToken ? jwtDecode<JwtPayload>(storedToken) : null)

  

const login  = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/auth/login', { email, password })
        const newtoken = response.data.token
        localStorage.setItem('token', newtoken)

        //Actualiza el estado de React con el nuevo token y la información del usuario decodificada
        setToken(newtoken)
        setUser(jwtDecode<JwtPayload>(newtoken))// Decodificamos el token para obtener la información del usuario id y rol 
    } 
    catch (error) {
        console.error('Login failed:', error)
    }
}
const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
}

return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
return context;
};

export default AuthProvider