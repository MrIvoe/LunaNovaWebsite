'use client';

import { ContactInfo, HoursData, SiteConfig } from '@/types';

interface FooterProps {
  contact: ContactInfo;
  config: SiteConfig;
  hoursData: HoursData;
}

export default function Footer({ contact, config, hoursData }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const businessHours = hoursData.hours ?? [];

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[color:var(--color-border)] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center">
          <div className="text-center">
            <h3 className="text-xl font-serif font-bold text-[var(--color-brand-strong)] mb-4">
              {config.businessShortName}
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm">{contact.businessName}</p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-accent font-semibold text-[var(--color-brand)] mb-4">
              {hoursData.hoursTitle}
            </h4>
            {businessHours.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {businessHours.map((hour, index) => (
                  <li key={`${hour.day}-${index}`} className="text-[var(--color-text-muted)]">
                    {hour.shortDay}: {hour.open}{hour.close ? ` - ${hour.close}` : ''}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">Hours are being updated.</p>
            )}
            {hoursData.holidays && <p className="text-xs text-[var(--color-text-muted)] mt-3 italic">{hoursData.holidays}</p>}
          </div>

          <div className="text-center">
            <h4 className="text-lg font-accent font-semibold text-[var(--color-brand)] mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>{contact.address}</li>
              <li><a href={`tel:${contact.phone}`} className="hover:text-[var(--color-brand)] transition-colors">{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="hover:text-[var(--color-brand)] transition-colors">{contact.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[color:var(--color-border)] pt-8">
          <p className="text-center text-[var(--color-text-muted)] text-sm">
            Copyright © {currentYear} {contact.businessName}. {config.footer?.copyrightSuffix || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
