import styles from './SuggestionList.module.css';

interface Suggestion {
  id: string;
  text: string;
  icon?: string;
}

interface SuggestionListProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
}

const defaultSuggestions: Suggestion[] = [
  { id: '1', text: 'Wie ben je?', icon: '👤' },
  { id: '2', text: 'Wat zijn je projecten?', icon: '🚀' },
  { id: '3', text: 'Waar investeer je in?', icon: '💡' },
  { id: '4', text: 'Wat is je achtergrond?', icon: '📚' },
  { id: '5', text: 'Hoe kan ik contact opnemen?', icon: '✉️' },
];

export function SuggestionList({
  suggestions = defaultSuggestions,
  onSelect,
}: SuggestionListProps) {
  return (
    <div className={styles.container}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          className={styles.suggestion}
          onClick={() => onSelect(suggestion)}
          type="button"
        >
          {suggestion.icon && (
            <span className={styles.suggestionIcon}>{suggestion.icon}</span>
          )}
          {suggestion.text}
        </button>
      ))}
    </div>
  );
}

export type { Suggestion };
