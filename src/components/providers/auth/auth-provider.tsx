'use client';

import {ReactNode, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {restoreAuth} from '@/lib/redux/slices/auth.slice.ts';
import {UserReponse} from '@/lib/types.ts';

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore auth state from localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser) as UserReponse;
          dispatch(restoreAuth(user));
        } catch (error) {
          console.error('Failed to restore auth:', error);
          localStorage.removeItem('auth_user');
        }
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}
