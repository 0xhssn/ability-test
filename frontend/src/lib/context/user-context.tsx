'use client';

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { User } from '@/types/user';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get('/auth/profile');
      return response.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  return (
    <UserContext.Provider value={{ user, isLoading, error: error as Error | null }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 