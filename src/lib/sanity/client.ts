import { createClient } from '@sanity/client';

// Sanity client configuration
// Replace these values with your actual Sanity project details
export const sanityClient = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for faster responses in production
});

// Type definitions for Sanity content
export interface Person {
  _id: string;
  name: string;
  role: string;
  bio: string;
  profilePhotos: SanityImage[];
}

export interface SanityImage {
  _key?: string;
  asset: {
    _ref: string;
    url?: string;
  };
  alt?: string;
}

export interface WorkRole {
  _id: string;
  title: string;
  organization: string;
  logo?: SanityImage;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Project {
  _id: string;
  name: string;
  category: string;
  logo?: SanityImage;
  description: string;
  url?: string;
}

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

// Content types union
export type ContentItem = Person | WorkRole | Project | FAQItem;

// Query helpers
export const queries = {
  // Get person info
  person: `*[_type == "person"][0] {
    _id,
    name,
    role,
    bio,
    "profilePhotos": profilePhotos[] {
      _key,
      asset->{
        _ref,
        url
      },
      alt
    }
  }`,

  // Get all work roles
  workRoles: `*[_type == "workRole"] | order(startDate desc) {
    _id,
    title,
    organization,
    logo {
      asset->{
        _ref,
        url
      }
    },
    startDate,
    endDate,
    description
  }`,

  // Get all projects
  projects: `*[_type == "project"] | order(_createdAt desc) {
    _id,
    name,
    category,
    logo {
      asset->{
        _ref,
        url
      }
    },
    description,
    url
  }`,

  // Get all FAQ items
  faqItems: `*[_type == "faqItem"] {
    _id,
    question,
    answer,
    category
  }`,

  // Search across all content
  search: (searchTerm: string) => `
    *[
      _type in ["person", "workRole", "project", "faqItem"] &&
      (
        name match "*${searchTerm}*" ||
        title match "*${searchTerm}*" ||
        question match "*${searchTerm}*" ||
        bio match "*${searchTerm}*" ||
        description match "*${searchTerm}*" ||
        answer match "*${searchTerm}*" ||
        organization match "*${searchTerm}*" ||
        category match "*${searchTerm}*"
      )
    ] {
      _id,
      _type,
      ...
    }
  `,
};

// Fetch functions
export async function fetchPerson(): Promise<Person | null> {
  try {
    return await sanityClient.fetch(queries.person);
  } catch (error) {
    console.error('Error fetching person:', error);
    return null;
  }
}

export async function fetchWorkRoles(): Promise<WorkRole[]> {
  try {
    return await sanityClient.fetch(queries.workRoles);
  } catch (error) {
    console.error('Error fetching work roles:', error);
    return [];
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    return await sanityClient.fetch(queries.projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchFAQItems(): Promise<FAQItem[]> {
  try {
    return await sanityClient.fetch(queries.faqItems);
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    return [];
  }
}

export async function searchContent(searchTerm: string): Promise<ContentItem[]> {
  try {
    return await sanityClient.fetch(queries.search(searchTerm));
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}

// Fetch all content for local filtering
export async function fetchAllContent() {
  try {
    const [person, workRoles, projects, faqItems] = await Promise.all([
      fetchPerson(),
      fetchWorkRoles(),
      fetchProjects(),
      fetchFAQItems(),
    ]);

    return {
      person,
      workRoles,
      projects,
      faqItems,
    };
  } catch (error) {
    console.error('Error fetching all content:', error);
    return {
      person: null,
      workRoles: [],
      projects: [],
      faqItems: [],
    };
  }
}
