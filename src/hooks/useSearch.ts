import { useState, useCallback } from 'react';
import { mockData } from '../lib/sanity/mockData';
import type { Person, Project, WorkRole, FAQItem } from '../lib/sanity/client';

interface SearchResults {
  person: Person | null;
  projects: Project[];
  workRoles: WorkRole[];
  faqItems: FAQItem[];
}

// Keywords mapping for different query types (English + Dutch)
const keywordMappings: Record<string, string[]> = {
  person: [
    // English
    'who', 'about', 'profile', 'branco', 'beek', 'yourself', 'you', 'designer', 'developer',
    // Dutch
    'wie', 'ben', 'jij', 'jezelf', 'over', 'profiel', 'naam', 'ontwikkelaar', 'frontend'
  ],
  projects: [
    // English
    'project', 'projects', 'built', 'made', 'work', 'app', 'investment', 'portfolio', 'website',
    // Dutch
    'bouw', 'gebouwd', 'gemaakt', 'investering'
  ],
  workRoles: [
    // English
    'work', 'job', 'experience', 'role', 'career', 'founder', 'current',
    // Dutch
    'baan', 'ervaring', 'rol', 'functie', 'carrière', 'werkervaring'
  ],
  faq: [
    // English
    'question', 'how', 'why', 'contact', 'reach', 'background', 'vision',
    // Dutch
    'vraag', 'vragen', 'hoe', 'waarom', 'bereiken', 'achtergrond', 'visie', 'investeer'
  ],
};

export function useSearch() {
  const [isSearching, setIsSearching] = useState(false);

  const searchContent = useCallback(async (query: string): Promise<SearchResults> => {
    setIsSearching(true);

    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(/\s+/);

    // Determine what type of content to show based on keywords
    const matchesCategory = (category: keyof typeof keywordMappings): boolean => {
      return words.some((word) =>
        keywordMappings[category].some((keyword) =>
          keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())
        )
      );
    };

    // Build results based on query
    const results: SearchResults = {
      person: null,
      projects: [],
      workRoles: [],
      faqItems: [],
    };

    // Check for person-related queries - show person + work roles (like reference)
    if (matchesCategory('person')) {
      results.person = mockData.person;
      results.workRoles = mockData.workRoles; // Always show roles with person
    }

    // Check for project-related queries
    if (matchesCategory('projects')) {
      results.projects = mockData.projects;
    }

    // Check for work-related queries
    if (matchesCategory('workRoles') && !results.person) {
      results.workRoles = mockData.workRoles;
    }

    // Check for FAQ-related queries
    if (matchesCategory('faq')) {
      results.faqItems = mockData.faqItems;
    }

    // If no specific category matched, show person profile as default
    if (!results.person && results.projects.length === 0 && 
        results.workRoles.length === 0 && results.faqItems.length === 0) {
      results.person = mockData.person;
      results.workRoles = mockData.workRoles;
    }

    setIsSearching(false);
    return results;
  }, []);

  return {
    searchContent,
    isSearching,
  };
}
