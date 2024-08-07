import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/providers';
import type { Metadata } from 'next';
import { Recursive } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Recursive({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'feedback',
  description: 'feedback is a platform that allows you to collect feedback from your users.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Toaster
            position="bottom-right"
            icons={{
              success: '🎉',
              error: '❌',
              warning: '⚠️',
              info: 'ℹ️',
            }}
            duration={5000}
            
          />
        </Providers>
      </body>
    </html>
  );
}
