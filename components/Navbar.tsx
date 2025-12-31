'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navContent}>
          {/* Left side - Logo + Brand */}
          <Link href="/" className={styles.brand}>
            <div className={styles.logoWrapper}>
              <span className={styles.logoText}>S</span>
            </div>
            <span className={styles.brandName}>Serin</span>
          </Link>

          {/* Center - Navigation Links (Desktop) */}
          <div className={styles.navLinks}>
            <Link href="#features" className={styles.navLink}>Features</Link>
            <Link href="#support" className={styles.navLink}>Contact Us</Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className={styles.navRight}>
            <Link href="https://app.chatwithserin.com/login" className={styles.loginLink}>
              Log In
            </Link>
            <a href="https://app.chatwithserin.com" className={styles.ctaButton}>
              Try it free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link href="#features" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="#support" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <div className={styles.mobileAuthButtons}>
              <Link href="https://app.chatwithserin.com/login" className={styles.mobileLoginLink}>
                Log In
              </Link>
              <a href="https://app.chatwithserin.com" className={styles.mobileCta}>
                Try it free
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
