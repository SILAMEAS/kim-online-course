'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreAuth } from '@/lib/redux/slices/auth.slice';
import { User } from '@/lib/types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore auth state from localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser) as User;
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
