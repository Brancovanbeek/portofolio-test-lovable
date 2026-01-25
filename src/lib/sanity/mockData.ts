// Mock data for development - edit this file to customize your content
import type { Person, WorkRole, Project, FAQItem } from './client';

// Profile photos - replace these URLs with your own images
export const profilePhotos = {
  main: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face',
  secondary: [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
  ],
};

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
        url: profilePhotos.main,
      },
      alt: 'Branco van Beek',
    },
  ],
};

// Rich text description with bold keywords
// Use **text** for bold words
export const richDescription = `**Branco van Beek** is a frontend designer, developer, and entrepreneur based in the Netherlands. He focuses on the intersection of **design, AI, and technology**, working to shape how people interact with digital products through thoughtful, innovative experiences.`;

export const mockWorkRoles: WorkRole[] = [
  {
    _id: 'work-1',
    title: 'Founder',
    organization: 'Web Agency (Coming Soon)',
    startDate: '2025-02',
    description: 'Co-founding a web agency with 2 fellow students, focusing on modern web development',
  },
  {
    _id: 'work-2',
    title: 'Frontend Developer',
    organization: 'Bajeslab',
    startDate: '2024-01',
    description: 'Building a website for a new construction project on the former Bijlmerbajes location',
  },
  {
    _id: 'work-3',
    title: 'Freelance Designer',
    organization: 'Independent',
    startDate: '2023-01',
    description: 'Creating unique digital experiences combining AI and design',
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
    name: 'Portfolio',
    category: 'Personal Project',
    description: 'Deze interactieve chat-gebaseerde portfolio website.',
    url: '#',
  },
  {
    _id: 'project-3',
    name: 'AI Design Tools',
    category: 'Side Project',
    description: 'Experimenteren met AI-gedreven design tools en workflows.',
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
    category: 'Persoonlijk',
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
  richDescription,
  profilePhotos,
};
