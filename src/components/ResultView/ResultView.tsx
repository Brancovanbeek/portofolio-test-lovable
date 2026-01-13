import styles from './ResultView.module.css';
import type { Person, Project, WorkRole, FAQItem } from '../../lib/sanity/client';

interface ResultViewProps {
  person?: Person | null;
  projects?: Project[];
  workRoles?: WorkRole[];
  faqItems?: FAQItem[];
  query?: string;
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
        <section className={styles.section}>
          <div className={styles.profile}>
            {person.profilePhotos?.[0]?.asset?.url && (
              <img
                src={person.profilePhotos[0].asset.url}
                alt={person.name}
                className={styles.profileImage}
              />
            )}
            <h1 className={styles.profileName}>{person.name}</h1>
            <p className={styles.profileRole}>{person.role}</p>
            <p className={styles.profileBio}>{person.bio}</p>
          </div>
        </section>
      )}

      {/* Work Roles */}
      {workRoles.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Werkervaring</h2>
          <div className={styles.cardGrid}>
            {workRoles.map((role) => (
              <div key={role._id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardLogoPlaceholder}>
                    {role.organization.charAt(0)}
                  </div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{role.title}</h3>
                    <p className={styles.cardSubtitle}>{role.organization}</p>
                  </div>
                </div>
                {role.description && (
                  <p className={styles.cardDescription}>{role.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projecten & Investeringen</h2>
          <div className={styles.cardGrid}>
            {projects.map((project) => (
              <div key={project._id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardLogoPlaceholder}>
                    {project.name.charAt(0)}
                  </div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{project.name}</h3>
                  </div>
                </div>
                <p className={styles.cardDescription}>{project.description}</p>
                <span className={styles.cardCategory}>{project.category}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Items */}
      {faqItems.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Veelgestelde vragen</h2>
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
