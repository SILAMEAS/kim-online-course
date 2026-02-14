'use client';

import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { store } from '@/lib/redux/store';
import { queryClient } from '@/lib/api/client';
import { AuthProvider } from './auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
