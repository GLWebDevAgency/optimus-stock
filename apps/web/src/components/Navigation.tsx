/**
 * Navigation Component - Barre de navigation principale
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@optimus/ui';

const navItems = [
  { href: '/', label: 'Accueil', icon: '🏠' },
  { href: '/dashboard', label: 'Tableau de Bord', icon: '📊' },
  { href: '/inventory', label: 'Inventaire', icon: '📦' },
  { href: '/orders', label: 'Commandes', icon: '🛒' },
  { href: '/suppliers', label: 'Fournisseurs', icon: '🤝' },
];

export function Navigation(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 bg-glass-light backdrop-blur-glass border-b border-gold-200/20 shadow-glass"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-oasis-200">
              Optimus Stock
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="md"
                    className="gap-2"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="md">
              Se connecter
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex gap-1 pb-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  size="sm"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.icon}</span>
                  <span className="ml-1">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
