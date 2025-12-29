import { Hero } from '@/components/Hero';
import { HabitBuilder } from '@/components/HabitBuilder';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      {/* Hero Section with Feature Cards */}
      <Hero />

      {/* Habit Builder Section */}
      <HabitBuilder />

      {/* Contact Form / Beta Section */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
