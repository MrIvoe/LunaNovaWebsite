'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MediaLibrary, NavigationData, SiteConfig } from '@/types';

interface HeaderProps {
  config: SiteConfig;
  media: MediaLibrary;
  navigation: NavigationData;
}

export default function Header({ config, media, navigation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = navigation.items ?? [];
  const hasHeaderCta = Boolean(navigation.headerCta?.href && navigation.headerCta?.label);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur border-b border-[color:var(--color-border)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <img src={media.logo.src} alt={media.logo.alt || config.businessShortName} className="h-10 w-auto" />
          <div className="hidden sm:block text-xl font-serif font-bold text-[var(--color-brand-strong)]">
            {config.businessShortName}
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-text-primary)] hover:text-[var(--color-brand-strong)] transition-colors duration-300 font-accent text-sm tracking-wide uppercase font-semibold"
            >
              {item.label}
            </Link>
          ))}
          {hasHeaderCta && (
            <Link
              href={navigation.headerCta.href}
              className="btn-link inline-block px-4 py-2 rounded-md bg-[var(--color-brand)] !text-[rgb(130,32,250)] hover:!text-[rgb(130,32,250)] font-semibold hover:bg-[var(--color-brand-strong)] transition-colors"
            >
              {navigation.headerCta.label}
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[var(--color-text-primary)] hover:text-[var(--color-brand-strong)]"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[color:var(--color-border)]">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[var(--color-text-primary)] hover:text-[var(--color-brand-strong)] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {hasHeaderCta && (
              <Link
                href={navigation.headerCta.href}
                onClick={() => setIsMenuOpen(false)}
                className="btn-link inline-block w-full text-center px-4 py-2 rounded-md bg-[var(--color-brand)] !text-[rgb(130,32,250)] hover:!text-[rgb(130,32,250)] font-semibold hover:bg-[var(--color-brand-strong)] transition-colors"
              >
                {navigation.headerCta.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
