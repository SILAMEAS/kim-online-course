'use client';

import {Provider} from 'react-redux';
import {QueryClientProvider} from '@tanstack/react-query';

import {store} from '@/lib/redux/store.ts';
import {queryClient} from '@/lib/api/client.ts';
import {AuthProvider} from './auth-provider.tsx';
import {ReactNode} from "react";
import {ThemeProvider} from "@/components/providers/theme/theme-provider.tsx";

export function Providers({children}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
