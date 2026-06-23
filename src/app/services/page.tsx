import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';
import { loadContent } from '@/lib/content-server';
import { CONTENT_FILES } from '@/lib/content-files';
import { SiteConfig, ServicesData, ContactInfo, HoursData, MediaLibrary, NavigationData } from '@/types';
import Link from 'next/link';

export default function ServicesPage() {
  const siteConfig = loadContent<SiteConfig>(CONTENT_FILES.site.brand);
  const servicesData = loadContent<ServicesData>(CONTENT_FILES.pages.servicesCatalog);
  const contactInfo = loadContent<ContactInfo>(CONTENT_FILES.pages.contactDetails);
  const hoursData = loadContent<HoursData>(CONTENT_FILES.operations.businessHours);
  const media = loadContent<MediaLibrary>(CONTENT_FILES.site.mediaLibrary);
  const navigation = loadContent<NavigationData>(CONTENT_FILES.site.navigation);
  const services = servicesData.services ?? [];
  const hasServices = services.length > 0;
  const hasCta = Boolean(servicesData.cta.title && servicesData.cta.buttonText && servicesData.cta.buttonLink);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Header config={siteConfig} media={media} navigation={navigation} />

      <main className="flex-1">
        <section className="py-10 bg-[var(--color-surface)] border-b border-[color:var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-serif font-bold text-[var(--color-text-primary)] mb-3">
              {servicesData.header.titlePrefix} <span className="text-[var(--color-brand)]">{servicesData.header.titleHighlight}</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-center text-[var(--color-text-muted)] max-w-5xl mx-auto [text-wrap:balance]">
              {servicesData.header.description}
            </p>
            {hasServices ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 mt-8">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-6 text-center text-[var(--color-text-muted)]">
                Service details will appear here soon.
              </div>
            )}
          </div>
        </section>

        {hasCta && (
          <section className="py-10 bg-[var(--color-bg)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-2">
                {servicesData.cta.title}
              </h2>
              {servicesData.cta.description && (
                <p className="text-base text-center text-[var(--color-text-muted)] max-w-3xl mx-auto mb-5 [text-wrap:balance]">
                  {servicesData.cta.description}
                </p>
              )}
              <Link
                href={servicesData.cta.buttonLink}
                className="btn-link inline-block px-6 py-2.5 bg-[var(--color-brand)] !text-[rgb(130,32,250)] hover:!text-[rgb(130,32,250)] font-accent font-bold tracking-wide uppercase rounded-lg hover:bg-[var(--color-brand-strong)] transition-all duration-300 transform hover:scale-105"
              >
                {servicesData.cta.buttonText}
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer contact={contactInfo} config={siteConfig} hoursData={hoursData} />
    </div>
  );
}
