import styles from './MessageItem.module.css';
import type { Project, WorkRole, FAQItem } from '../../lib/sanity/client';

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  data?: {
    projects?: Project[];
    workRoles?: WorkRole[];
    faqItems?: FAQItem[];
    images?: string[];
    person?: {
      name: string;
      role: string;
      bio: string;
      photo?: string;
    };
  };
  isLoading?: boolean;
}

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  if (message.type === 'user') {
    return (
      <div className={styles.userMessage}>
        <div className={styles.userContent}>
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.assistantMessage}>
      <div className={styles.assistantContent}>
        {message.isLoading ? (
          <div className={styles.loading}>
            <div className={styles.loadingDot} />
            <div className={styles.loadingDot} />
            <div className={styles.loadingDot} />
          </div>
        ) : (
          <>
            {/* Text content */}
            <div className={styles.text}>
              {message.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Person info with photo */}
            {message.data?.person && (
              <div className={styles.cardGrid}>
                <div className={styles.card}>
                  {message.data.person.photo && (
                    <img
                      src={message.data.person.photo}
                      alt={message.data.person.name}
                      className={styles.cardLogo}
                      style={{ width: 80, height: 80, borderRadius: '50%' }}
                    />
                  )}
                  <div className={styles.cardTitle}>{message.data.person.name}</div>
                  <div className={styles.cardSubtitle}>{message.data.person.role}</div>
                  <div className={styles.cardDescription}>{message.data.person.bio}</div>
                </div>
              </div>
            )}

            {/* Projects */}
            {message.data?.projects && message.data.projects.length > 0 && (
              <div className={styles.cardGrid}>
                {message.data.projects.map((project) => (
                  <div key={project._id} className={styles.card}>
                    <div className={styles.cardSubtitle}>{project.category}</div>
                    <div className={styles.cardTitle}>{project.name}</div>
                    <div className={styles.cardDescription}>{project.description}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Work roles */}
            {message.data?.workRoles && message.data.workRoles.length > 0 && (
              <div className={styles.cardGrid}>
                {message.data.workRoles.map((role) => (
                  <div key={role._id} className={styles.card}>
                    <div className={styles.cardTitle}>{role.title}</div>
                    <div className={styles.cardSubtitle}>{role.organization}</div>
                    {role.description && (
                      <div className={styles.cardDescription}>{role.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* FAQ Items */}
            {message.data?.faqItems && message.data.faqItems.length > 0 && (
              <div className={styles.list}>
                <ul>
                  {message.data.faqItems.map((faq) => (
                    <li key={faq._id}>
                      <strong>{faq.question}</strong>
                      <br />
                      {faq.answer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Images */}
            {message.data?.images && message.data.images.length > 0 && (
              <div className={styles.imageGrid}>
                {message.data.images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Afbeelding ${idx + 1}`}
                    className={styles.image}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
