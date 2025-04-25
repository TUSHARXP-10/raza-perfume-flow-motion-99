
import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeSection from '@/components/ThemeSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import StorySection from '@/components/sections/StorySection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

const Index: React.FC = () => {
  const { currentTheme } = useTheme();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <CartProvider>
      <div className={`theme-transition ${currentTheme}-theme`}>
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main>
          {/* Hero Section with Theme Switching */}
          <ThemeSection />
          
          {/* Featured Products Section */}
          <FeaturedProducts />
          
          {/* Our Story Section */}
          <StorySection />
          
          {/* Testimonials Section */}
          <TestimonialSection />
          
          {/* Newsletter Section */}
          <NewsletterSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
