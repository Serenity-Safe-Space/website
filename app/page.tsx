import { Hero } from '@/components/Hero';
import { TransitionSection } from '@/components/TransitionSection';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        title="It's okay to not be okay."
        subtitle="Private. Safe. Always here when you need to talk."
        ctaText="Chat now"
        ctaLink="https://app.chatwithserin.com"
      />

      {/* Transition/Animation Section */}
      <TransitionSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer/Final CTA Section */}
      <Footer />
    </main>
  );
}
