import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { loadContent } from '@/lib/content-server';
import { CONTENT_FILES } from '@/lib/content-files';
import { SiteConfig, HeroData, ContactInfo, HoursData, MediaLibrary, NavigationData } from '@/types';

export default function Home() {
  const siteConfig = loadContent<SiteConfig>(CONTENT_FILES.site.brand);
  const heroData = loadContent<HeroData>(CONTENT_FILES.pages.homeHero);
  const contactInfo = loadContent<ContactInfo>(CONTENT_FILES.pages.contactDetails);
  const hoursData = loadContent<HoursData>(CONTENT_FILES.operations.businessHours);
  const media = loadContent<MediaLibrary>(CONTENT_FILES.site.mediaLibrary);
  const navigation = loadContent<NavigationData>(CONTENT_FILES.site.navigation);
  const hasWhyChoose = heroData.whyChooseSection.items.length > 0;
  const hasTestimonials = heroData.trustSection.testimonials.length > 0;
  const hasConversionChecklist = heroData.conversionSection.checklist.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Header config={siteConfig} media={media} navigation={navigation} />

      <main className="flex-1">
        <Hero data={heroData} media={media} />

        <section className="py-8 bg-[var(--color-surface)] border-y border-[color:var(--color-border)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg md:text-xl font-serif text-[var(--color-brand)]">
              {heroData.quoteSection.quote}
            </p>
          </div>
        </section>

        <section className="py-10 bg-[var(--color-bg)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-3 text-center">
                {heroData.conversionSection.titlePrefix} <span className="text-[var(--color-brand)]">{heroData.conversionSection.titleHighlight}</span>
              </h2>
              <p className="text-sm md:text-base text-[var(--color-text-muted)] text-center max-w-3xl mx-auto mb-5 [text-wrap:balance]">
                {heroData.conversionSection.description}
              </p>
              {hasConversionChecklist && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2 mb-5 text-center">
                  {heroData.conversionSection.checklist.map((item, index) => (
                    <div key={`${item}-${index}`} className="text-sm text-center text-[var(--color-text-primary)]">
                      ✓ {item}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-center text-[var(--color-brand)] font-semibold mb-4">{heroData.conversionSection.callText}</p>
              <div className="text-center">
                <a href={heroData.conversionSection.buttonLink} className="btn-link inline-block px-6 py-2.5 rounded-lg bg-[var(--color-brand)] !text-[rgb(130,32,250)] hover:!text-[rgb(130,32,250)] font-accent font-bold tracking-wide uppercase hover:bg-[var(--color-brand-strong)] transition-colors">
                  {heroData.conversionSection.buttonText}
                </a>
              </div>
            </div>
          </div>
        </section>

        {hasWhyChoose && (
          <section className="py-10 bg-[var(--color-bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-2">
                  {heroData.whyChooseSection.titlePrefix}{' '}
                  <span className="text-[var(--color-brand)]">{heroData.whyChooseSection.titleHighlight}</span>
                </h2>
                {heroData.whyChooseSection.description && (
                  <p className="text-base text-center text-[var(--color-text-muted)] max-w-3xl mx-auto [text-wrap:balance]">
                    {heroData.whyChooseSection.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
                {heroData.whyChooseSection.items.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm text-center text-[var(--color-text-muted)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {hasTestimonials && (
          <section className="py-10 bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-2">
                  {heroData.trustSection.titlePrefix}{' '}
                  <span className="text-[var(--color-brand)]">{heroData.trustSection.titleHighlight}</span>
                </h2>
                {heroData.trustSection.description && (
                  <p className="text-base text-center text-[var(--color-text-muted)] max-w-3xl mx-auto [text-wrap:balance]">
                    {heroData.trustSection.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
                {heroData.trustSection.testimonials.map((testimonial, index) => (
                  <blockquote
                    key={`${testimonial.quote}-${index}`}
                    className="bg-[var(--color-surface-alt)] border border-[color:var(--color-border)] rounded-lg p-4 text-sm text-center italic text-[var(--color-text-muted)]"
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer contact={contactInfo} config={siteConfig} hoursData={hoursData} />
    </div>
  );
}
