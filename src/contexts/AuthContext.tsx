import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextValue {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 

  const login = (): void => {
    // Lógica para salvar o estado de login (ex: localStorage, cookies) - a ser implementada
   
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    // Lógica para limpar o estado de login - a ser implementada
   
    setIsLoggedIn(false);
  };

  const value: AuthContextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};