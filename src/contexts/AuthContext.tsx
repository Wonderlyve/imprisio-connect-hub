
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types
export type UserRole = 'client' | 'printer' | 'admin';

export interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  businessName?: string;
  businessAddress?: string;
}

// Sample user accounts
const SAMPLE_USERS = [
  {
    id: '1',
    email: 'client@imprisio.com',
    password: 'client1234',
    fullName: 'Client Example',
    role: 'client' as UserRole,
  },
  {
    id: '2',
    email: 'printer@imprisio.com',
    password: 'printer1234',
    fullName: 'Printer Example',
    role: 'printer' as UserRole,
    businessName: 'Imprimerie Example',
    businessAddress: '123 Rue Principale, Kinshasa'
  }
];

interface AuthContextType {
  currentUser: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('imprisio_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = SAMPLE_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (user) {
      // Remove password from the user object before storing
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('imprisio_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return {
        success: true,
        message: 'Connexion réussie'
      };
    }
    
    setIsLoading(false);
    return {
      success: false,
      message: 'Email ou mot de passe incorrect'
    };
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('imprisio_user');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        isLoading, 
        login, 
        logout,
        isLoggedIn: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
