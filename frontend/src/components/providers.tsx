'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/lib/context/user-context';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
} 