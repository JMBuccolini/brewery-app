'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  loading:true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
//Guardamos el token en el localStorage y lo leemos al iniciar la aplicacion
  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(token);
  };

  
  //Si no hay token, redirigimos a la pagina de login
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setTokenState(storedToken);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuthenticated: !!token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
