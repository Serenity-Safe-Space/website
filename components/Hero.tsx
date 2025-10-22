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
      <div className="container">
        <div className={styles.heroContent}>
          {/* Left column - Text content */}
          <div className={styles.textContent}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <a href={ctaLink} className={styles.ctaLink}>
              <Button variant="primary">{ctaText}</Button>
            </a>
          </div>

          {/* Right column - Illustration */}
          <div className={styles.illustration}>
            <Image
              src="/hero-llama.png"
              alt="Serin mascot - friendly llama with sunglasses"
              width={600}
              height={600}
              priority
              className={styles.illustrationImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
