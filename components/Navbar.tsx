import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navContent}>
          {/* Left side - Logo + Brand */}
          <div className={styles.brand}>
            <Image
              src="/serin_icon.png"
              alt="Serin logo"
              width={60}
              height={60}
              className={styles.logo}
            />
            <span className={styles.brandName}>Serin</span>
          </div>

          {/* Right side - Social icons + CTA */}
          <div className={styles.navRight}>
            {/* Social Icons */}
            <div className={styles.socialIcons}>
              <a
                href="mailto:hello@chatwithserin.com"
                className={styles.iconLink}
                aria-label="Email"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@chatwithserin"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="TikTok"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/chatwithserin"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/chatwithserin"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
                </svg>
              </a>
            </div>

            {/* CTA Button */}
            <a href="https://app.chatwithserin.com" className={styles.ctaLink}>
              <Button variant="primary">Start now</Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
