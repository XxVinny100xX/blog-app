import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 

  const login = (email: string, password:string): Promise<void> => {
    return new Promise((resolve, reject) => { // Return a new Promise
      setTimeout(() => { // Simulate a short delay (like an API call would have)
        if(email === 'testesfiap3fsdt@gmail.com' && password === '1234') {
          setIsLoggedIn(true);
          resolve(); // Resolve the Promise on successful login
        } else {
          reject(new Error("Invalid credentials")); // Reject the Promise on failed login
        }
      }, 500); // 500ms delay - you can adjust this
    });
  };

  const logout = (): void => {
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