import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
  variant?: 'default' | 'large' | 'compact';
  initialValue?: string;
  autoFocus?: boolean;
}

export function ChatInput({
  onSubmit,
  placeholder = 'Ask anything',
  variant = 'default',
  initialValue = '',
  autoFocus = false,
}: ChatInputProps) {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const containerClass = 
    variant === 'large' ? styles.containerLarge :
    variant === 'compact' ? styles.containerCompact :
    styles.container;

  const inputWrapperClass = 
    variant === 'large' ? styles.inputWrapperLarge :
    variant === 'compact' ? styles.inputWrapperCompact :
    styles.inputWrapper;

  const inputClass = 
    variant === 'large' ? styles.inputLarge :
    variant === 'compact' ? styles.inputCompact :
    styles.input;

  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit} className={inputWrapperClass}>
        {/* Plus button */}
        <button type="button" className={styles.iconButton} aria-label="Add attachment">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          className={inputClass}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          aria-label="Chat input"
        />

        {/* Globe button */}
        <button type="button" className={styles.iconButton} aria-label="Web search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
        </button>

        {/* Submit button - blue circle */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!value.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}
