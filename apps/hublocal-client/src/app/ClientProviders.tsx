'use client';

import { SnackbarProvider } from 'notistack';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { SessionProvider } from 'next-auth/react'
import StoreProvider from './StoreProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <SessionProvider>
        <StoreProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StoreProvider>
      </SessionProvider>
    </SnackbarProvider>
  );
}
