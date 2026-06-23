'use client';

import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const features = service.features ?? [];

  return (
    <div
      tabIndex={0}
      className="group bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-6 text-center hover:border-[var(--color-brand)] focus:border-[var(--color-brand)] transition-all duration-300 transform hover:-translate-y-1"
    >
      <h3 className="text-xl font-serif font-bold text-[var(--color-brand)] mb-3">
        {service.title}
      </h3>

      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Hover to view details</p>

      <div className="text-[var(--color-text-muted)] leading-relaxed text-sm mb-5 max-h-none opacity-100 md:max-h-0 md:opacity-0 md:overflow-hidden md:group-hover:max-h-[24rem] md:group-hover:opacity-100 md:group-focus-within:max-h-[24rem] md:group-focus-within:opacity-100 transition-all duration-300">
        <p className="mb-4">{service.description}</p>
        {features.length > 0 && (
          <ul className="space-y-3 text-center">
            {features.map((feature, index) => (
              <li key={`${feature}-${index}`} className="flex items-center justify-center space-x-2">
                <span className="text-[var(--color-brand)] font-bold">✓</span>
                <span className="text-[var(--color-text-primary)]">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
