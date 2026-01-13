import { useState, useCallback } from 'react';
import { Header } from '../components/Header/Header';
import { ChatInput } from '../components/ChatInput/ChatInput';
import { SuggestionList, type Suggestion } from '../components/SuggestionList/SuggestionList';
import { MessageList } from '../components/MessageList/MessageList';
import { type Message } from '../components/MessageItem/MessageItem';
import { useSearch } from '../hooks/useSearch';
import { mockData } from '../lib/sanity/mockData';
import styles from './Index.module.css';

type ViewState = 'home' | 'chat';

const suggestions: Suggestion[] = [
  { id: '1', text: 'Wie ben je?', icon: '👤' },
  { id: '2', text: 'Wat zijn je projecten?', icon: '🚀' },
  { id: '3', text: 'Waar investeer je in?', icon: '💡' },
  { id: '4', text: 'Wat is je werkervaring?', icon: '💼' },
  { id: '5', text: 'Hoe kan ik contact opnemen?', icon: '✉️' },
];

export default function Index() {
  const [viewState, setViewState] = useState<ViewState>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { searchContent, isSearching } = useSearch();

  const generateResponse = useCallback(async (query: string) => {
    const results = await searchContent(query);

    // Generate contextual response text
    let responseText = '';
    const data: Message['data'] = {};

    if (results.person) {
      responseText = `Hier is informatie over ${results.person.name}:`;
      data.person = {
        name: results.person.name,
        role: results.person.role,
        bio: results.person.bio,
        photo: results.person.profilePhotos?.[0]?.asset?.url,
      };
    }

    if (results.projects.length > 0) {
      if (responseText) responseText += '\n\n';
      responseText += `Hier zijn ${results.projects.length === 1 ? 'het project' : 'de projecten'} die relevant zijn:`;
      data.projects = results.projects;
    }

    if (results.workRoles.length > 0) {
      if (responseText) responseText += '\n\n';
      responseText += `Hier is de werkervaring:`;
      data.workRoles = results.workRoles;
    }

    if (results.faqItems.length > 0) {
      if (responseText) responseText += '\n\n';
      responseText += `Dit zijn gerelateerde vragen en antwoorden:`;
      data.faqItems = results.faqItems;
    }

    if (!responseText) {
      responseText = `Ik kon geen specifieke informatie vinden voor "${query}". Probeer een andere vraag of kies een van de suggesties.`;
    }

    return { text: responseText, data };
  }, [searchContent]);

  const handleSubmit = useCallback(async (message: string) => {
    // Switch to chat view
    setViewState('chat');
    setInputValue('');

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
    };

    // Add loading message
    const loadingMessage: Message = {
      id: `assistant-${Date.now()}`,
      type: 'assistant',
      content: '',
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    // Generate response
    const response = await generateResponse(message);

    // Replace loading message with actual response
    setMessages((prev) => {
      const newMessages = [...prev];
      const loadingIndex = newMessages.findIndex((m) => m.isLoading);
      if (loadingIndex !== -1) {
        newMessages[loadingIndex] = {
          ...newMessages[loadingIndex],
          content: response.text,
          data: response.data,
          isLoading: false,
        };
      }
      return newMessages;
    });
  }, [generateResponse]);

  const handleSuggestionSelect = useCallback((suggestion: Suggestion) => {
    handleSubmit(suggestion.text);
  }, [handleSubmit]);

  const handleNewChat = useCallback(() => {
    setViewState('home');
    setMessages([]);
    setInputValue('');
  }, []);

  if (viewState === 'home') {
    return (
      <div className={styles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>
              Hallo, ik ben {mockData.person.name}
            </h1>
            <p className={styles.heroSubtitle}>
              {mockData.person.role}. Stel me een vraag of kies een onderwerp hieronder.
            </p>
          </div>

          <div className={styles.inputSection}>
            <ChatInput
              onSubmit={handleSubmit}
              placeholder="Waar wil je meer over weten?"
              variant="large"
              autoFocus
            />
          </div>

          <SuggestionList
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
          />

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              © 2024 {mockData.person.name}. Gebouwd met ❤️
            </p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header onNewChat={handleNewChat} showNewChat />
      
      <div className={styles.chatContainer}>
        <div className={styles.chatMessages}>
          <MessageList messages={messages} />
        </div>

        <div className={styles.chatInput}>
          <ChatInput
            onSubmit={handleSubmit}
            placeholder="Stel nog een vraag..."
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
}
