export interface SiteConfig {
  businessName: string;
  businessShortName: string;
  tagline: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  footer?: {
    copyrightSuffix: string;
  };
}

export interface DesignTokens {
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    brand: string;
    brandStrong: string;
    textPrimary: string;
    textMuted: string;
    border: string;
  };
  gradients: {
    hero: string;
  };
}

export interface SeoMetadataContent {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: 'website';
  };
}

export interface HeroData {
  tagline: string;
  subtitle: string;
  cta: {
    text: string;
    link: string;
  };
  servicesSection: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    items: string[];
  };
  whyChooseSection: {
    titlePrefix: string;
    titleHighlight: string;
    description?: string;
    items: string[];
  };
  trustSection: {
    titlePrefix: string;
    titleHighlight: string;
    description?: string;
    testimonials: {
      quote: string;
    }[];
  };
  quoteSection: {
    quote: string;
  };
  conversionSection: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    checklist: string[];
    callText: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ServicesData {
  header: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  serviceHighlights?: {
    titlePrefix: string;
    titleHighlight: string;
    description?: string;
    items: string[];
  };
  services: Service[];
  benefits: {
    titlePrefix: string;
    titleHighlight: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  text: string;
  image: string;
  rating: number;
}

export interface AboutData {
  header: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  missionTitle: string;
  mission: string;
  storyTitle: string;
  story: string;
  valuesSectionTitlePrefix: string;
  valuesSectionTitleHighlight: string;
  values: string[];
  teamSectionTitlePrefix: string;
  teamSectionTitleHighlight: string;
  team: TeamMember[];
  testimonialsSectionTitlePrefix: string;
  testimonialsSectionTitleHighlight: string;
  testimonials: Testimonial[];
}

export interface ContactInfo {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  form: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitIdle: string;
    submitLoading: string;
    successMessage: string;
    errorMessage: string;
    fallbackHint: string;
  };
  preFormCta: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    checklist: string[];
    callText: string;
  };
  formEndpoint?: string;
}

export interface Hour {
  day: string;
  shortDay: string;
  open: string;
  close: string;
}

export interface HoursData {
  hoursTitle: string;
  hours: Hour[];
  holidays: string;
}

export interface MediaLibrary {
  logo: {
    src: string;
    alt: string;
  };
  hero: {
    videoUrl: string;
    poster: string;
  };
  team: {
    defaultImage: string;
  };
  serviceIcons: Record<string, string>;
}

export interface NavigationData {
  headerCta: {
    label: string;
    href: string;
  };
  items: {
    label: string;
    href: string;
  }[];
  footer: {
    quickLinksTitle: string;
    contactTitle: string;
  };
}
