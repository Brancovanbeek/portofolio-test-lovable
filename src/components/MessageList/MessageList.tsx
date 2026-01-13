import { useEffect, useRef } from 'react';
import { MessageItem, type Message } from '../MessageItem/MessageItem';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>💬</div>
          <p className={styles.emptyText}>Stel een vraag om te beginnen</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inner}>
        {messages.map((message, index) => (
          <div key={message.id}>
            <MessageItem message={message} />
            {index < messages.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  );
}
