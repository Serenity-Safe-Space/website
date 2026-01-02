import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        {/* Main Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>Your daily</span>
              <span className={styles.titleLine}>mental reset in <span className={styles.highlight}>2</span></span>
              <span className={styles.titleLine}><span className={styles.highlight}>minutes.</span></span>
            </h1>
            <p className={styles.subtitle}>
              Be one of the first to experience this limited-time free beta. Don&apos;t miss out.
            </p>
            <a href="https://app.chatwithserin.com" className={styles.ctaButton}>
              Try it free
            </a>
          </div>

          <div className={styles.illustration}>
            <div className={styles.llamaCircle}>
              <Image
                src="/serin-hero-llama.png"
                alt="Serin mascot - friendly llama with sunglasses"
                width={680}
                height={680}
                priority
                className={styles.llamaImage}
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={styles.featureCards}>
          {/* Card 1 - Support your friends */}
          <div className={styles.featureCard}>
            <div className={styles.cardMockup}>
              <div className={styles.mockupContent}>
                <div className={styles.chatBubbleYellow}>
                  <span className={styles.bubbleAvatarYellow}>😊</span>
                  <span className={styles.bubbleTextDark}>Leo boosted you!</span>
                </div>
                <div className={styles.chatBubblePurple}>
                  <span className={styles.bubbleAvatarPurple}>⭐</span>
                  <span className={styles.bubbleTextDark}>Kai sent a reaction</span>
                </div>
              </div>
            </div>
            <h3 className={styles.cardTitle}>Support your friends</h3>
            <p className={styles.cardDescription}>
              Cheer on your pals, celebrate wins, and lift each other up.
            </p>
          </div>

          {/* Card 2 - Private Chat & Vent */}
          <div className={styles.featureCard}>
            <div className={styles.cardMockup}>
              <div className={styles.mockupContent}>
                <div className={styles.privateChatRow}>
                  <span className={styles.serinAvatarGreen}>S</span>
                  <span className={styles.chatTextSmall}>Safe space to vent? 🌱</span>
                </div>
                <div className={styles.privateChatResponseGreen}>
                  Always. No judgment here.
                </div>
              </div>
            </div>
            <h3 className={styles.cardTitle}>Private Chat & Vent</h3>
            <p className={styles.cardDescription}>
              Chat with Serin every day to clear your mind. It&apos;s fully private.
            </p>
          </div>

          {/* Card 3 - Keep the streak */}
          <div className={styles.featureCard}>
            <div className={styles.cardMockup}>
              <div className={styles.mockupHeader}>
                <span className={styles.mockupLabel}>STREAK</span>
              </div>
              <div className={styles.streakContent}>
                <div className={styles.streakNumberRow}>
                  <span className={styles.fireIconLarge}>🔥</span>
                  <span className={styles.streakCountOrange}>12</span>
                </div>
                <div className={styles.streakCheckGreen}>✓</div>
              </div>
            </div>
            <h3 className={styles.cardTitle}>Keep the streak</h3>
            <p className={styles.cardDescription}>
              Build daily habits, feel good often.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
