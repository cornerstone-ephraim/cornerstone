export type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type SeoContent = {
  title: string;
  description: string;
};

export type HomeContent = {
  seo: SeoContent;
  hero: {
    eyebrow: string;
    title: string[];
    description: string;
    primaryAction: LinkItem;
    secondaryAction: LinkItem;
    portrait: string;
    portraitAlt: string;
    trustSignals?: string[];
  };
  selectedWork: {
    label: string;
    heading: string;
    projectSlugs: string[];
  };
  clientWork: { label: string; heading: string };
  products: { label: string; heading: string };
  experience: { label: string; heading: string };
  process: {
    label: string;
    heading: string;
    steps: Array<{ title: string; description: string }>;
  };
  contact: {
    label: string;
    heading: string;
    description: string;
    availability?: string[];
    action: LinkItem;
    scheduler?: LinkItem;
  };
};

export type AboutContent = {
  seo: SeoContent;
  label: string;
  heading: string;
  introduction: string[];
  portrait: string;
  portraitAlt: string;
  resume: LinkItem;
  principles: Array<{ title: string; description: string }>;
  workingStyle: string[];
  industries: string[];
  tools: string[];
  enjoyBuilding: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  description: string;
  url?: string;
  logo?: string;
  color?: string;
};

export type ExperienceContent = { items: ExperienceItem[] };

export type ContactContent = {
  seo: SeoContent;
  label: string;
  heading: string;
  description: string;
  email: string;
  resume: LinkItem;
  scheduler: LinkItem;
  socials: LinkItem[];
  form: {
    heading: string;
    description: string;
    submitLabel: string;
  };
};

export type NavigationContent = {
  brand: string;
  items: LinkItem[];
  cta: LinkItem;
  footerDescription: string;
};

export type ProjectCategory = "Client Work" | "Product" | "Digital Experience";

export type ProjectContent = {
  slug: string;
  title: string;
  category: ProjectCategory;
  industry: string;
  website?: string;
  github?: string;
  status: string;
  role: string;
  summary: string;
  shortDescription: string;
  responsibilities: string[];
  highlights: string[];
  technologies: string[];
  caseStudy?: {
    overview: string[];
    role: string[];
    challenges: string[];
    approach: string[];
    outcome: string[];
    pullQuote?: string;
  };
  published?: boolean;
  featured: boolean;
  order: number;
  cover: {
    image?: string;
    alt: string;
    tone: string;
  };
  interactionPreview?: {
    video: string;
    poster: string;
    label?: string;
    caption?: string;
  };
  seo: SeoContent;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
};

export type Tech = {
  name: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
};
