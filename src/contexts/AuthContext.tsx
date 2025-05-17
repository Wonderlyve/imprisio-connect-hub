
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

// Define user types
export type UserRole = 'client' | 'printer' | 'admin';

export interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  businessName?: string;
  businessAddress?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  currentUser: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string) => Promise<{success: boolean, message: string}>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          // Defer profile fetch with setTimeout to prevent deadlocks
          setTimeout(() => {
            fetchProfile(session.user);
          }, 0);
        } else {
          setCurrentUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (user: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
        return;
      }

      if (profile) {
        // Check if user is a printer
        const { data: printerData } = await supabase
          .from('printers')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setCurrentUser({
          id: user.id,
          email: user.email || '',
          fullName: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
          role: printerData ? 'printer' : (profile.role as UserRole || 'client'),
          avatarUrl: profile.avatar_url,
          ...(printerData && {
            businessName: printerData.business_name,
            businessAddress: printerData.address
          })
        });
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return {
          success: false,
          message: error.message || 'Email ou mot de passe incorrect'
        };
      }

      return {
        success: true,
        message: 'Connexion réussie'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Une erreur s\'est produite lors de la connexion'
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string, fullName: string): Promise<{success: boolean, message: string}> => {
    try {
      setIsLoading(true);
      
      // Split full name into first and last name
      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts.shift() || '';
      const lastName = nameParts.join(' ');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        return {
          success: false,
          message: error.message || 'Erreur lors de l\'inscription'
        };
      }

      return {
        success: true,
        message: 'Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.'
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Une erreur s\'est produite lors de l\'inscription'
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setCurrentUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Erreur lors de la déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        isLoading, 
        login, 
        logout,
        isLoggedIn: !!currentUser,
        session,
        signUp
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
