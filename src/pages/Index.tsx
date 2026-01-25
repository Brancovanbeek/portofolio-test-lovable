import { useState, useCallback } from 'react';
import { ChatInput } from '../components/ChatInput/ChatInput';
import { SuggestionList, type Suggestion } from '../components/SuggestionList/SuggestionList';
import { ResultView } from '../components/ResultView/ResultView';
import { useSearch } from '../hooks/useSearch';
import { mockData } from '../lib/sanity/mockData';
import type { Person, Project, WorkRole, FAQItem } from '../lib/sanity/client';
import styles from './Index.module.css';

type ViewState = 'home' | 'result';

interface SearchResults {
  person: Person | null;
  projects: Project[];
  workRoles: WorkRole[];
  faqItems: FAQItem[];
}

const suggestions: Suggestion[] = [
  { id: '1', text: 'Who is Branco van Beek?' },
  { id: '2', text: 'What are your projects?' },
  { id: '3', text: 'What is your experience?' },
];

export default function Index() {
  const [viewState, setViewState] = useState<ViewState>('home');
  const [currentQuery, setCurrentQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const { searchContent } = useSearch();

  const handleSubmit = useCallback(async (query: string) => {
    setCurrentQuery(query);
    setViewState('result');
    
    const searchResults = await searchContent(query);
    setResults(searchResults);
  }, [searchContent]);

  const handleSuggestionSelect = useCallback((suggestion: Suggestion) => {
    handleSubmit(suggestion.text);
  }, [handleSubmit]);

  const handleBack = useCallback(() => {
    setViewState('home');
    setCurrentQuery('');
    setResults(null);
  }, []);

  // Get initials for header
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  if (viewState === 'home') {
    return (
      <div className={styles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>
              What would you like to know?
            </h1>
          </div>

          <div className={styles.inputSection}>
            <ChatInput
              onSubmit={handleSubmit}
              placeholder="Ask anything"
              variant="large"
              autoFocus
            />
          </div>

          <SuggestionList
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>
        {/* Header with back button */}
        <header className={styles.resultHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.backButton} onClick={handleBack} aria-label="Go back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className={styles.headerTitle}>
              <span className={styles.headerInitials}>
                {getInitials(mockData.person.name)}
              </span>
              <span>{mockData.person.name}</span>
            </div>
          </div>
          <button className={styles.shareButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
            Share
          </button>
        </header>

        {/* Query pill */}
        <div className={styles.queryPill}>
          <span className={styles.queryText}>{currentQuery}</span>
        </div>

        {/* Result content */}
        <div className={styles.resultContent}>
          {results && (
            <ResultView
              person={results.person}
              projects={results.projects}
              workRoles={results.workRoles}
              faqItems={results.faqItems}
              query={currentQuery}
            />
          )}
        </div>

        {/* Fixed input at bottom */}
        <div className={styles.bottomInput}>
          <div className={styles.bottomInputWrapper}>
            <ChatInput
              onSubmit={handleSubmit}
              placeholder="Ask a follow-up..."
              variant="compact"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
