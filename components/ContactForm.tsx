'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual only - no backend integration
    alert('Thanks for your message! This is a demo form.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className={styles.section} id="support">
      <div className="container">
        <div className={styles.wrapper}>
          {/* Left side - Copy */}
          <div className={styles.content}>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>+</span>
              Open Beta
            </span>

            <h2 className={styles.title}>
              Build Serin with us.
            </h2>

            <p className={styles.description}>
              We&apos;re currently in the lab, and we need your big brain energy. 🧠
              Got a feature idea that slaps? Found a bug acting sus? Or just want to
              share what you love? Drop us a line and help shape the future of Serin.
            </p>

            <div className={styles.badges}>
              <span className={styles.featureBadge}>
                Share Your Vision 💡
              </span>
              <span className={styles.featureBadge}>
                🎯 Squash Bugs
              </span>
            </div>

            <div className={styles.contactInfoDesktop}>
              <span className={styles.contactLabel}>QUESTIONS?</span>
              <a href="mailto:hello@chatwithserin.app" className={styles.email}>
                <span className={styles.emailIcon}>@</span>
                hello@chatwithserin.app
              </a>
            </div>
          </div>

          {/* Right side - Form */}
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  YOUR NAME (OR ALIAS)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Main Character"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  DROP YOUR KNOWLEDGE 🧠
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I think it would be fire if..."
                  rows={4}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send to the Team 🚀
              </button>
            </form>

            <div className={styles.contactInfoMobile}>
              <span className={styles.contactLabel}>QUESTIONS?</span>
              <a href="mailto:hello@chatwithserin.app" className={styles.email}>
                <span className={styles.emailIcon}>@</span>
                hello@chatwithserin.app
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
