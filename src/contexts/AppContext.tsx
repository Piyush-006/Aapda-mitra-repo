import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_LANGUAGE } from '../constants/languages';

interface AppContextType {
  // App State
  isOnline: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  
  // Auth State
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  
  // App Flow
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  
  // Role Management
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [language, setLanguage] = useLocalStorage('language', DEFAULT_LANGUAGE);
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentScreen('dashboard');
    }
  }, [isAuthenticated]);

  const value: AppContextType = {
    isOnline,
    language,
    setLanguage,
    user,
    setUser,
    isAuthenticated,
    currentScreen,
    setCurrentScreen,
    selectedRole,
    setSelectedRole,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}