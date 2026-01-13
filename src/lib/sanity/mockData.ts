// Mock data for development before Sanity is connected
import type { Person, WorkRole, Project, FAQItem } from './client';

export const mockPerson: Person = {
  _id: 'person-1',
  name: 'Branco van Beek',
  role: 'Frontend Designer & Developer',
  bio: 'Hoi, ik ben Branco. Een 19-jarige designer en developer uit Volendam met een passie voor ondernemen. Ik focus me op het bouwen van slimme websites waarbij AI en design samenkomen tot een unieke ervaring.',
  profilePhotos: [
    {
      _key: 'photo-1',
      asset: {
        _ref: 'image-1',
        url: ' https://cdn.sanity.io/images/your-project-id/production/branco-profile.jpg',
      },
      alt: 'Branco van Beek',
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
    name: 'Bajeslab',
    category: 'Website Development',
    description: 'Een website voor een nieuwbouwproject gebouwd op de voormalige bijlmerbajes locatie.',
    url: 'https://bajeslab.example.com',
  },
  {
    _id: 'project-2',
    name: 'Portofolio',
    category: 'Website Development',
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
    answer: 'Ik heb een achtergrond in frontend design en development. Ik focus me nu vooral op AI en ondernemerschap.',
    category: 'Persoonlijk',
  },
  {
    _id: 'faq-2',
    question: 'Waar kom je vandaan?',
    answer: 'Ik kom uit Volendam, Nederland. Het is een klein dorp waar ik veel connecties heb opgebouwd in de tech-community.',
    category: 'Investeren',
  },
  {
    _id: 'faq-3',
    question: 'Hoe kan ik contact opnemen?',
    answer: 'Je kunt me bereiken via LinkedIn of een e-mail sturen naar brancovanbeek5@gmail.com. Ik probeer binnen 48 uur te reageren.',
    category: 'Contact',
  },
  {
    _id: 'faq-4',
    question: 'Wat zijn je huidige projecten?',
    answer: 'Op dit moment bouw ik aan een website voor Bajeslab en begin Februari start ik mijn eigen webagency met 2 medestudenten.',
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
