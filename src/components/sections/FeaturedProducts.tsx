
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getFeaturedProducts } from '@/data/products';
import ProductsGrid from '@/components/products/ProductsGrid';
import { cn } from '@/lib/utils';

const FeaturedProducts: React.FC = () => {
  const { currentTheme } = useTheme();
  const featuredProducts = getFeaturedProducts();
  
  const getSectionClass = () => {
    return cn(
      "py-24",
      currentTheme === 'regal' && "bg-regal-background text-regal-text",
      currentTheme === 'mystic' && "bg-mystic-background text-mystic-text",
      currentTheme === 'bloom' && "bg-bloom-background text-bloom-text",
      currentTheme === 'amber' && "bg-amber-background text-amber-text",
    );
  };

  return (
    <section className={getSectionClass()}>
      <ProductsGrid 
        products={featuredProducts} 
        title="Featured Fragrances"
        subtitle="Experience our most coveted scents crafted with rare ingredients and meticulous artistry."
        featured
      />
    </section>
  );
};

export default FeaturedProducts;
