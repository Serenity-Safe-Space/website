import React from 'react';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  avatar: string; // Letter or emoji
  avatarColor: 'yellow' | 'purple';
  text: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  avatar,
  avatarColor,
  text,
}) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.avatar} ${styles[avatarColor]}`}>
        <span className={styles.avatarContent}>{avatar}</span>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
