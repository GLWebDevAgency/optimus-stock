import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Optimus Stock - ERP Gestion de Stock Restaurant',
  description:
    'Solution ERP SaaS pour la gestion de stock et commandes fournisseurs en restauration',
  keywords: ['ERP', 'stock', 'restaurant', 'commandes', 'fournisseurs'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
