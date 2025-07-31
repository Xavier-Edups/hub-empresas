import type { Metadata } from 'next';
import ClientProviders from './ClientProviders';

export const metadata: Metadata = {
  title: 'HubLocal Empresas',
  description: 'Adiministre suas empresas e locais',
};

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
          <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
