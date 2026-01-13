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
  placeholder = 'Waar wil je meer over weten?',
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
      textarea.style.height = `${textarea.scrollHeight}px`;
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
    styles.inputWrapper;

  const inputClass = 
    variant === 'large' ? styles.inputLarge :
    styles.input;

  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit} className={inputWrapperClass}>
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
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!value.trim()}
          aria-label="Verstuur bericht"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
