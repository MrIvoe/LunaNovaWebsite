import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { loadContent } from '@/lib/content-server';
import { CONTENT_FILES } from '@/lib/content-files';
import { SiteConfig, AboutData, ContactInfo, HoursData, MediaLibrary, NavigationData } from '@/types';

export default function AboutPage() {
  const siteConfig = loadContent<SiteConfig>(CONTENT_FILES.site.brand);
  const aboutData = loadContent<AboutData>(CONTENT_FILES.pages.aboutCompany);
  const contactInfo = loadContent<ContactInfo>(CONTENT_FILES.pages.contactDetails);
  const hoursData = loadContent<HoursData>(CONTENT_FILES.operations.businessHours);
  const media = loadContent<MediaLibrary>(CONTENT_FILES.site.mediaLibrary);
  const navigation = loadContent<NavigationData>(CONTENT_FILES.site.navigation);
  const teamMembers = aboutData.team ?? [];
  const values = aboutData.values ?? [];
  const testimonials = aboutData.testimonials ?? [];
  const hasTeam = teamMembers.length > 0;
  const hasValues = values.length > 0;
  const hasTestimonials = testimonials.length > 0;
  const hasMission = Boolean(aboutData.missionTitle && aboutData.mission);
  const hasStory = Boolean(aboutData.storyTitle && aboutData.story);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Header config={siteConfig} media={media} navigation={navigation} />

      <main className="flex-1">
        <section className="py-10 bg-[var(--color-surface)] border-b border-[color:var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-serif font-bold text-[var(--color-text-primary)] mb-3">
              {aboutData.header.titlePrefix} <span className="text-[var(--color-brand)]">{aboutData.header.titleHighlight}</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-center text-[var(--color-text-muted)] max-w-4xl mx-auto [text-wrap:balance]">
              {aboutData.header.description}
            </p>
          </div>
        </section>

        <section className="py-10 bg-[var(--color-bg)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-5 text-center">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-5">
                  {aboutData.teamSectionTitlePrefix} <span className="text-[var(--color-brand)]">{aboutData.teamSectionTitleHighlight}</span>
                </h2>
                {hasTeam ? (
                  <div className="space-y-5">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="bg-[var(--color-surface-alt)] border border-[color:var(--color-border)] rounded-lg overflow-hidden"
                      >
                        <div className="aspect-[4/3] bg-[var(--color-brand)]/10 flex items-center justify-center">
                          <img
                            src={member.image === 'team-default' ? media.team.defaultImage : member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="text-lg font-serif font-bold text-[var(--color-brand)] mb-1">
                            {member.name}
                          </h3>
                          <p className="text-xs font-accent text-[var(--color-text-primary)] mb-2 uppercase tracking-wide">
                            {member.title}
                          </p>
                          <p className="text-sm text-center text-[var(--color-text-muted)] leading-relaxed">
                            {member.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-center text-[var(--color-text-muted)]">Team details will be shared here soon.</p>
                )}
              </div>

              <div className="space-y-4 text-center">
                {hasMission && (
                  <div className="bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-5">
                    <h2 className="text-xl font-serif font-bold text-[var(--color-brand)] mb-3">
                      {aboutData.missionTitle}
                    </h2>
                    <p className="text-sm text-center text-[var(--color-text-muted)] leading-relaxed">
                      {aboutData.mission}
                    </p>
                  </div>
                )}

                {hasStory && (
                  <div className="bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-5">
                    <h2 className="text-xl font-serif font-bold text-[var(--color-brand)] mb-3">
                      {aboutData.storyTitle}
                    </h2>
                    <p className="text-sm text-center text-[var(--color-text-muted)] leading-relaxed">
                      {aboutData.story}
                    </p>
                  </div>
                )}

                {hasValues && (
                  <div className="bg-[var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-5">
                    <h2 className="text-xl font-serif font-bold text-[var(--color-brand)] mb-3">
                      {aboutData.valuesSectionTitlePrefix}{' '}
                      <span className="text-[var(--color-brand)]">{aboutData.valuesSectionTitleHighlight}</span>
                    </h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2 text-center">
                      {values.map((value, index) => (
                        <div
                          key={`${value}-${index}`}
                          className="bg-[var(--color-surface-alt)] border border-[color:var(--color-border)] rounded-md p-3"
                        >
                          <p className="text-sm font-serif font-bold text-[var(--color-brand)]">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {hasTestimonials && (
          <section className="py-12 bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-serif font-bold text-center text-[var(--color-text-primary)] mb-8">
                {aboutData.testimonialsSectionTitlePrefix}{' '}
                <span className="text-[var(--color-brand)]">{aboutData.testimonialsSectionTitleHighlight}</span>
              </h2>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-[var(--color-surface-alt)] border border-[color:var(--color-border)] rounded-lg p-6 hover:border-[var(--color-brand)] transition-all duration-300 flex flex-col"
                  >
                    <div className="flex gap-1 justify-center mb-4">
                      {[...Array(Math.max(0, Math.min(5, testimonial.rating)))].map((_, i) => (
                        <span key={i} className="text-[var(--color-brand)] text-lg">
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-[var(--color-text-muted)] text-center mb-6 flex-grow italic">
                      {'"' + testimonial.text + '"'}
                    </p>

                    <div className="border-t border-[color:var(--color-border)] pt-6 text-center">
                      <p className="font-serif font-bold text-[var(--color-brand)]">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-center text-[var(--color-text-muted)]">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
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
