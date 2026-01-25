import styles from './ResultView.module.css';
import { mockData, profilePhotos, richDescription } from '../../lib/sanity/mockData';
import type { Person, Project, WorkRole, FAQItem } from '../../lib/sanity/client';

interface ResultViewProps {
  person?: Person | null;
  projects?: Project[];
  workRoles?: WorkRole[];
  faqItems?: FAQItem[];
  query?: string;
}

// Helper to render rich text with **bold** syntax
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx}>{part.slice(2, -2)}</strong>;
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}

export function ResultView({
  person,
  projects = [],
  workRoles = [],
  faqItems = [],
  query,
}: ResultViewProps) {
  const hasResults = person || projects.length > 0 || workRoles.length > 0 || faqItems.length > 0;

  if (!hasResults) {
    return (
      <div className={styles.noResults}>
        <div className={styles.noResultsIcon}>🔍</div>
        <p className={styles.noResultsText}>
          Geen resultaten gevonden voor "{query}"
        </p>
        <p className={styles.noResultsHint}>
          Probeer een andere zoekopdracht
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Person Profile */}
      {person && (
        <>
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <h1 className={styles.profileName}>{person.name}</h1>
            <p className={styles.profileRole}>{person.role}</p>
          </div>

          {/* Photo Grid - Main photo left, 2 smaller on right */}
            <div className={styles.photoGrid}>
            <div className={styles.mainPhotoWrapper}>
              <img
              src={profilePhotos.main}
              alt={person.name}
              className={styles.mainPhoto}
              />
            </div>
            {profilePhotos.secondary.slice(0, 2).map((url, idx) => (
              <div key={idx} className={styles.secondaryPhotoWrapper}>
              <img
                src={url}
                alt={`${person.name} foto ${idx + 2}`}
                className={styles.secondaryPhoto}
              />
              </div>
            ))}
            </div>

          {/* Rich Description with bold keywords */}
          <p className={styles.description}>
            <RichText text={richDescription} />
          </p>
        </>
      )}

      {/* Work Roles - Bullet list style */}
      {workRoles.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Current roles</h2>
          <ul className={styles.rolesList}>
            {workRoles.map((role) => (
              <li key={role._id} className={styles.roleItem}>
                <strong>{role.organization}</strong>
                <span className={styles.roleSeparator}>—</span>
                {role.description || role.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.cardGrid}>
            {projects.map((project) => (
              <div key={project._id} className={styles.card}>
                <h3 className={styles.cardTitle}>{project.name}</h3>
                <p className={styles.cardCategory}>{project.category}</p>
                <p className={styles.cardDescription}>{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Items */}
      {faqItems.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently asked</h2>
          <div className={styles.faqList}>
            {faqItems.map((faq) => (
              <div key={faq._id} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
