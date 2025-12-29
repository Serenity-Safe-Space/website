import React from 'react';
import styles from './HabitBuilder.module.css';

export const HabitBuilder: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          {/* Left side - Copy */}
          <div className={styles.content}>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>+</span>
              HABIT BUILDER
            </span>
            <h2 className={styles.title}>
              Build a habit in{' '}
              <span className={styles.highlight}>2 minutes</span> a day.
            </h2>
            <p className={styles.description}>
              Serin helps you track your mood and build streaks without the pressure.
              It&apos;s the easiest habit you&apos;ll ever keep.
            </p>
            <a href="https://app.chatwithserin.com" className={styles.ctaButton}>
              Try it free
            </a>
          </div>

          {/* Right side - Streak Mockup */}
          <div className={styles.mockupWrapper}>
            <div className={styles.streakCard}>
              <h3 className={styles.streakTitle}>Streak Extended!</h3>
              <p className={styles.streakSubtitle}>You&apos;re building a solid habit.</p>

              <div className={styles.fireIcon}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 13.5 18.5 11.5 17 10C16.5 9.5 16 9 15.5 8C15 7 14.5 6 14 5C13.5 4 12.5 2.5 12 2C11.5 2.5 10.5 4 10 5C9.5 6 9 7 8.5 8C8 9 7.5 9.5 7 10C5.5 11.5 4.5 13.5 4.5 15.5C4.5 19.6421 7.85786 23 12 23Z" fill="#F97316" stroke="#F97316" strokeWidth="2"/>
                  <path d="M12 19C13.6569 19 15 17.6569 15 16C15 15 14.5 14 14 13.5C13.5 13 13 12.5 12.5 11.5C12.25 11 12 10.5 12 10C12 10.5 11.75 11 11.5 11.5C11 12.5 10.5 13 10 13.5C9.5 14 9 15 9 16C9 17.6569 10.3431 19 12 19Z" fill="#FED7AA"/>
                </svg>
              </div>

              <div className={styles.streakNumber}>12</div>
              <div className={styles.streakLabel}>DAYS IN A ROW</div>

              <div className={styles.checkmarks}>
                <span className={styles.check}>✓</span>
                <span className={styles.check}>✓</span>
                <span className={styles.check}>✓</span>
                <span className={styles.check}>✓</span>
                <span className={styles.checkFire}>🔥</span>
              </div>

              <div className={styles.rewardBadge}>
                Next Reward: 2 Days 🎁
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
