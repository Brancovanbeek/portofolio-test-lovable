// Mock data for development before Sanity is connected
import type { Person, WorkRole, Project, FAQItem } from './client';

export const mockPerson: Person = {
  _id: 'person-1',
  name: 'Thomas de Vries',
  role: 'Ondernemer & Investeerder',
  bio: 'Ik ben een tech-ondernemer met een passie voor innovatie. Al meer dan 10 jaar bouw en investeer ik in digitale producten die mensen helpen. Van startups tot scale-ups, ik geloof in de kracht van technologie om echte problemen op te lossen.',
  profilePhotos: [
    {
      _key: 'photo-1',
      asset: {
        _ref: 'image-1',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      },
      alt: 'Thomas de Vries',
    },
  ],
};

export const mockWorkRoles: WorkRole[] = [
  {
    _id: 'work-1',
    title: 'Founder & CEO',
    organization: 'TechVentures',
    startDate: '2020-01',
    description: 'Leiding geven aan een team van 25+ mensen en het bouwen van innovatieve SaaS-producten.',
  },
  {
    _id: 'work-2',
    title: 'Angel Investor',
    organization: 'Diverse Startups',
    startDate: '2018-01',
    description: 'Investeren in early-stage tech startups met focus op fintech en healthtech.',
  },
  {
    _id: 'work-3',
    title: 'Adviseur',
    organization: 'Scale-Up Nederland',
    startDate: '2019-06',
    description: 'Strategisch advies aan snelgroeiende tech-bedrijven.',
  },
];

export const mockProjects: Project[] = [
  {
    _id: 'project-1',
    name: 'PayFlow',
    category: 'Fintech',
    description: 'Een betalingsplatform dat kleine bedrijven helpt met snelle en veilige transacties. Inmiddels actief in 5 landen.',
    url: 'https://payflow.example.com',
  },
  {
    _id: 'project-2',
    name: 'HealthTrack',
    category: 'Healthtech',
    description: 'AI-gedreven gezondheidsmonitoring app met 100.000+ gebruikers.',
    url: 'https://healthtrack.example.com',
  },
  {
    _id: 'project-3',
    name: 'EduLearn',
    category: 'EdTech',
    description: 'Online leerplatform voor professionele ontwikkeling met gepersonaliseerde leerpaden.',
    url: 'https://edulearn.example.com',
  },
  {
    _id: 'project-4',
    name: 'GreenEnergy',
    category: 'CleanTech',
    description: 'Investering in duurzame energie oplossingen voor huishoudens.',
  },
];

export const mockFAQItems: FAQItem[] = [
  {
    _id: 'faq-1',
    question: 'Wat is je achtergrond?',
    answer: 'Ik heb een achtergrond in software engineering en ben begonnen als developer. Na enkele jaren ben ik overgestapt naar ondernemerschap en heb meerdere bedrijven opgericht.',
    category: 'Persoonlijk',
  },
  {
    _id: 'faq-2',
    question: 'Waarin investeer je?',
    answer: 'Ik focus vooral op early-stage tech startups in de sectoren fintech, healthtech en edtech. Ik zoek naar teams met een sterke visie en een bewezen vermogen om uit te voeren.',
    category: 'Investeren',
  },
  {
    _id: 'faq-3',
    question: 'Hoe kan ik contact opnemen?',
    answer: 'Je kunt me bereiken via LinkedIn of een e-mail sturen naar hello@example.com. Ik probeer binnen 48 uur te reageren.',
    category: 'Contact',
  },
  {
    _id: 'faq-4',
    question: 'Wat zijn je huidige projecten?',
    answer: 'Op dit moment focus ik me op het opschalen van TechVentures en het begeleiden van verschillende portfolio-bedrijven. Daarnaast ben ik actief als spreker op tech-evenementen.',
    category: 'Werk',
  },
  {
    _id: 'faq-5',
    question: 'Wat is je visie op de toekomst van tech?',
    answer: 'Ik geloof dat AI en automatisering de grootste impact zullen hebben op hoe we werken en leven. De bedrijven die hier slim op inspelen zullen de winnaars van morgen zijn.',
    category: 'Visie',
  },
];

// Export all mock data as a bundle
export const mockData = {
  person: mockPerson,
  workRoles: mockWorkRoles,
  projects: mockProjects,
  faqItems: mockFAQItems,
};
