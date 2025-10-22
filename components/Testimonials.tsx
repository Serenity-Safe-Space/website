import React from 'react';
import styles from './Testimonials.module.css';
import { TestimonialCard } from './TestimonialCard';

const testimonialData = [
  {
    avatar: 'A',
    avatarColor: 'yellow' as const,
    text: 'Serin helped me open up about things I never talk about.',
  },
  {
    avatar: '❤️',
    avatarColor: 'yellow' as const,
    text: "It's like a safe space in my pocket.",
  },
  {
    avatar: 'D',
    avatarColor: 'purple' as const,
    text: "Serin doesn't judge, it just helps me process.",
  },
  {
    avatar: 'C',
    avatarColor: 'purple' as const,
    text: 'Finally something that actually listens.',
  },
  {
    avatar: '😊',
    avatarColor: 'yellow' as const,
    text: 'Finally something that actually listens.',
  },
  {
    avatar: '✓',
    avatarColor: 'yellow' as const,
    text: 'It feels like a friend who gets it.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className={styles.testimonialsSection}>
      {/* Decorative elements */}
      <span className={styles.decorHeart}>💜</span>
      <span className={styles.decorStar}>✨</span>

      <div className="container">
        {/* Intro paragraph */}
        <p className={styles.intro}>
          Every day, people come to Serin to let it out, feel lighter, and find a bit of calm. Here's what they're saying 💬
        </p>

        {/* Title and subtitle */}
        <h2 className={styles.title}>
          Made for overthinkers, loved by healers
        </h2>
        <p className={styles.subtitle}>
          See how others are finding peace, one chat at a time
        </p>

        {/* Testimonials grid */}
        <div className={styles.grid}>
          {testimonialData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              avatar={testimonial.avatar}
              avatarColor={testimonial.avatarColor}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
