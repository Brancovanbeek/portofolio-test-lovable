import styles from './Header.module.css';

interface HeaderProps {
  onNewChat: () => void;
  showNewChat?: boolean;
}

export function Header({ onNewChat, showNewChat = false }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onNewChat}>
        <div className={styles.logoIcon}>P</div>
        <span>Portfolio</span>
      </div>
      
      {showNewChat && (
        <div className={styles.actions}>
          <button className={styles.newChatButton} onClick={onNewChat}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Nieuw gesprek</span>
          </button>
        </div>
      )}
    </header>
  );
}
