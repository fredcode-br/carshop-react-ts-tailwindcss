import { createContext, useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import axios, { AxiosError } from 'axios';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  error: string | null;
  signIn(user: object): Promise<void>;
  signOut(): void;
}

type Props = {  
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { login } = useApi();

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, [setUser]);
 
  async function signIn(userData: object) {
    try {
      const response = await login(userData);
      setUser(response.user);
      setError(null); 
      sessionStorage.setItem('@App:user', JSON.stringify(response.user));
      sessionStorage.setItem('@App:token', response.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          const errorMessage = axiosError.response.data;
          setError(String(errorMessage));
        } else {
          setError('An error occurred while logging in. Please try again.');
        }
      } else {
        console.error('Unknown error:', error);
        setError('An unknown error occurred while logging in. Please try again.');
      }
    }
  }

  function signOut() {
    setUser(null);
    sessionStorage.removeItem("@App:user");
    sessionStorage.removeItem("@App:token");
  }

  return (
    <AuthContext.Provider value={{ 
      signed: Boolean(user), 
      user, 
      error,
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
