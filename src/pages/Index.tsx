
import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeSection from '@/components/ThemeSection';
import ProductCategories from '@/components/products/ProductCategories';
import StorySection from '@/components/sections/StorySection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

const Index: React.FC = () => {
  const { currentTheme } = useTheme();
  
  // Initialize scroll-based theme switching
  useScrollTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CartProvider>
      <div className={`theme-transition ${currentTheme}-theme`}>
        <Header />
        
        <main className="relative">
          <ThemeSection />
          <ProductCategories />
          <StorySection />
          <TestimonialSection />
          <NewsletterSection />
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
