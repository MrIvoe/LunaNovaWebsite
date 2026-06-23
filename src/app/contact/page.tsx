import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { loadContent } from '@/lib/content-server';
import { CONTENT_FILES } from '@/lib/content-files';
import { SiteConfig, ContactInfo, HoursData, MediaLibrary, NavigationData } from '@/types';

export default function ContactPage() {
  const siteConfig = loadContent<SiteConfig>(CONTENT_FILES.site.brand);
  const contactInfo = loadContent<ContactInfo>(CONTENT_FILES.pages.contactDetails);
  const hoursData = loadContent<HoursData>(CONTENT_FILES.operations.businessHours);
  const media = loadContent<MediaLibrary>(CONTENT_FILES.site.mediaLibrary);
  const navigation = loadContent<NavigationData>(CONTENT_FILES.site.navigation);
  const preFormChecklist = contactInfo.preFormCta?.checklist ?? [];
  const hasPreFormCta = Boolean(
    contactInfo.preFormCta?.titlePrefix && contactInfo.preFormCta?.titleHighlight && contactInfo.preFormCta?.description
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Header config={siteConfig} media={media} navigation={navigation} />

      <main className="flex-1">
        <section className="py-10 bg-[var(--color-bg)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-5">
              {hasPreFormCta && (
                <div className="max-w-5xl mx-auto bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-5">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-3 text-center">
                    {contactInfo.preFormCta.titlePrefix}{' '}
                    <span className="text-[var(--color-brand)]">{contactInfo.preFormCta.titleHighlight}</span>
                  </h2>
                  <p className="text-sm md:text-base text-[var(--color-text-muted)] text-center max-w-3xl mx-auto mb-4">
                    {contactInfo.preFormCta.description}
                  </p>
                  {preFormChecklist.length > 0 && (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2 max-w-4xl mx-auto mb-4 text-center">
                      {preFormChecklist.map((item, index) => (
                        <div key={`${item}-${index}`} className="text-sm text-center text-[var(--color-text-primary)]">
                          ✓ {item}
                        </div>
                      ))}
                    </div>
                  )}
                  {contactInfo.preFormCta.callText && (
                    <p className="text-center text-[var(--color-brand)] font-semibold">{contactInfo.preFormCta.callText}</p>
                  )}
                </div>
              )}

              <div className="max-w-5xl mx-auto">
                <ContactForm data={contactInfo.form} formEndpoint={contactInfo.formEndpoint} destinationEmail={contactInfo.email} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer contact={contactInfo} config={siteConfig} hoursData={hoursData} />
    </div>
  );
}
