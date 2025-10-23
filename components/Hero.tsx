import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { Button } from './Button';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>
            Private. Safe. Always here
            <br className={styles.mobileBreak} />
            when you need to talk.
          </p>
          <div className={styles.ctaWrapper}>
            <a href={ctaLink} className={styles.ctaLink}>
              <Button variant="primary" className={styles.ctaButton}>
                {ctaText}
              </Button>
            </a>
          </div>
        </div>

        <div className={styles.illustration} aria-hidden="true">
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
    </section>
  );
};
