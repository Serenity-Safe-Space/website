# Serin Website

## Overview

Serin is a mental wellness companion app. This is the marketing website built with Next.js 15, TypeScript, and CSS Modules.

## Tech Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + Tailwind CSS 4
- **Fonts**: Inter (body), Poppins (fallback), Hangyaboly (custom display)

## Project Structure

```
app/
├── layout.tsx           # Root layout with Navbar
├── page.tsx             # Homepage composition
├── globals.css          # Global styles and utilities
└── foundations.css      # Design tokens (colors, typography, spacing)

components/
├── Navbar.tsx           # Navigation bar with mobile menu
├── Hero.tsx             # Hero section with feature cards
├── HabitBuilder.tsx     # Purple habit builder section
├── ContactForm.tsx      # Beta feedback form
├── Footer.tsx           # Footer with nav and social links
└── Button.tsx           # Reusable button component

public/
├── fonts/Hangyaboly.ttf # Custom display font
├── serin_icon.png       # Logo icon
├── serin-hero-llama.png # Hero mascot image
└── end-llama.png        # Footer mascot
```

## Design System

### Colors

```css
/* Primary */
--purple-700: #3c2a73;    /* Primary purple (buttons, accents) */
--purple-500: #4e3891;    /* Gradient purple */
--purple-900: #2d1f57;    /* Deep purple */

/* Accent */
--orange-500: #F97316;    /* Orange for highlights */
--orange-400: #FB923C;    /* Light orange */

/* Grays */
--gray-900: #1F2937;      /* Text */
--gray-600: #4B5563;      /* Secondary text */
--gray-100: #F3F4F6;      /* Backgrounds */
--gray-50: #F9FAFB;       /* Light backgrounds */
```

### Typography

- **Headlines**: Bold, using Inter font
- **Body**: Regular weight, good line height
- **Responsive**: clamp() values for fluid sizing

### Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Breakpoints

- Desktop: 1024px+
- Tablet: 900px
- Mobile: 600px

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Component Patterns

### CSS Modules

All components use CSS Modules (`.module.css`) for scoped styling.

```tsx
import styles from './Component.module.css';

<div className={styles.wrapper}>
```

### Container

Use the `.container` class for consistent page margins:

```tsx
<div className="container">
```

### Responsive Design

Use CSS custom properties and media queries:

```css
@media (max-width: 900px) {
  /* Tablet styles */
}

@media (max-width: 600px) {
  /* Mobile styles */
}
```

## External Links

- **App**: https://app.chatwithserin.com
- **Email**: hello@chatwithserin.app
- **Instagram**: @chatwithserin
- **TikTok**: @chatwithserin
- **LinkedIn**: /company/chatwithserin
