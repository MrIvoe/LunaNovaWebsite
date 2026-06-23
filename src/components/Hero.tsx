'use client';

import Link from 'next/link';
import { HeroData, MediaLibrary } from '@/types';

interface HeroProps {
  data: HeroData;
  media: MediaLibrary;
}

export default function Hero({ data, media }: HeroProps) {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[72vh] flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={media.hero.poster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={media.hero.videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[var(--hero-gradient)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-14">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
          <span className="text-[var(--color-brand-strong)]">{data.tagline}</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center text-[var(--color-text-muted)] mb-6 font-light max-w-4xl mx-auto [text-wrap:balance]">
          {data.subtitle}
        </p>

        <Link
          href={data.cta.link}
          className="btn-link inline-block w-full sm:w-auto max-w-xs px-7 py-3 bg-[var(--color-brand)] !text-[rgb(130,32,250)] hover:!text-[rgb(130,32,250)] font-accent font-bold tracking-wide uppercase rounded-lg hover:bg-[var(--color-brand-strong)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {data.cta.text}
        </Link>

        <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[var(--color-brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
