import { useState, useCallback, useMemo } from 'react';
import { mockData } from '../lib/sanity/mockData';
import type { Person, Project, WorkRole, FAQItem } from '../lib/sanity/client';

interface SearchResults {
  person: Person | null;
  projects: Project[];
  workRoles: WorkRole[];
  faqItems: FAQItem[];
}

// Keywords mapping for different query types
const keywordMappings: Record<string, string[]> = {
  person: ['wie', 'ben', 'jij', 'jezelf', 'over', 'profiel', 'naam', 'thomas'],
  projects: ['project', 'projecten', 'bouw', 'gebouwd', 'gemaakt', 'werk', 'app', 'investering', 'portfolio'],
  workRoles: ['werk', 'baan', 'ervaring', 'rol', 'functie', 'carrière', 'career', 'job', 'werkervaring'],
  faq: ['vraag', 'vragen', 'hoe', 'wat', 'waarom', 'contact', 'bereiken', 'achtergrond', 'visie', 'investeer'],
};

export function useSearch() {
  const [isSearching, setIsSearching] = useState(false);

  const searchContent = useCallback(async (query: string): Promise<SearchResults> => {
    setIsSearching(true);

    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(/\s+/);

    // Determine what type of content to show based on keywords
    const matchesCategory = (category: keyof typeof keywordMappings): boolean => {
      return words.some((word) =>
        keywordMappings[category].some((keyword) =>
          keyword.includes(word) || word.includes(keyword)
        )
      );
    };

    // Filter functions
    const filterProjects = (projects: Project[]): Project[] => {
      return projects.filter((project) =>
        project.name.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.category.toLowerCase().includes(normalizedQuery) ||
        words.some((word) =>
          project.name.toLowerCase().includes(word) ||
          project.description.toLowerCase().includes(word) ||
          project.category.toLowerCase().includes(word)
        )
      );
    };

    const filterWorkRoles = (roles: WorkRole[]): WorkRole[] => {
      return roles.filter((role) =>
        role.title.toLowerCase().includes(normalizedQuery) ||
        role.organization.toLowerCase().includes(normalizedQuery) ||
        (role.description?.toLowerCase().includes(normalizedQuery)) ||
        words.some((word) =>
          role.title.toLowerCase().includes(word) ||
          role.organization.toLowerCase().includes(word) ||
          (role.description?.toLowerCase().includes(word))
        )
      );
    };

    const filterFAQ = (items: FAQItem[]): FAQItem[] => {
      return items.filter((item) =>
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery) ||
        words.some((word) =>
          item.question.toLowerCase().includes(word) ||
          item.answer.toLowerCase().includes(word)
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

    // Check for person-related queries
    if (matchesCategory('person')) {
      results.person = mockData.person;
    }

    // Check for project-related queries
    if (matchesCategory('projects')) {
      results.projects = filterProjects(mockData.projects);
      if (results.projects.length === 0) {
        results.projects = mockData.projects; // Show all if no specific match
      }
    }

    // Check for work-related queries
    if (matchesCategory('workRoles')) {
      results.workRoles = filterWorkRoles(mockData.workRoles);
      if (results.workRoles.length === 0) {
        results.workRoles = mockData.workRoles;
      }
    }

    // Check for FAQ-related queries
    if (matchesCategory('faq')) {
      results.faqItems = filterFAQ(mockData.faqItems);
      if (results.faqItems.length === 0) {
        results.faqItems = mockData.faqItems.slice(0, 3);
      }
    }

    // If no specific category matched, try to find relevant content
    if (!results.person && results.projects.length === 0 && 
        results.workRoles.length === 0 && results.faqItems.length === 0) {
      // Try filtering each category
      results.projects = filterProjects(mockData.projects);
      results.workRoles = filterWorkRoles(mockData.workRoles);
      results.faqItems = filterFAQ(mockData.faqItems);

      // If still nothing, show some default content
      if (results.projects.length === 0 && 
          results.workRoles.length === 0 && 
          results.faqItems.length === 0) {
        results.person = mockData.person;
        results.faqItems = mockData.faqItems.slice(0, 2);
      }
    }

    setIsSearching(false);
    return results;
  }, []);

  return {
    searchContent,
    isSearching,
  };
}
