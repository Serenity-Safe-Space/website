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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/fire.JPG" alt="Fire streak" className={styles.fireImage} />
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
