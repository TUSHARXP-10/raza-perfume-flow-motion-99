
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ProductsGrid from './ProductsGrid';
import { cn } from '@/lib/utils';
import ScentPath from '../animations/ScentPath';

const categories = [
  {
    id: 'casual',
    name: 'Casual Collection',
    subtitle: 'Everyday elegance for the modern connoisseur'
  },
  {
    id: 'premium',
    name: 'Premium Collection',
    subtitle: 'Luxurious fragrances for distinguished tastes'
  },
  {
    id: 'luxury',
    name: 'Luxury Collection',
    subtitle: 'Exclusive scents crafted with rare ingredients'
  },
  {
    id: 'limited',
    name: 'Limited Edition',
    subtitle: 'Unique compositions for the true collector'
  }
];

const ProductCategories: React.FC = () => {
  const { currentTheme } = useTheme();

  const getSectionClass = (index: number) => {
    return cn(
      "min-h-screen relative overflow-hidden transition-colors duration-1000",
      index % 2 === 0 ? "py-24" : "py-32",
      currentTheme === 'regal' && "bg-regal-background text-regal-text",
      currentTheme === 'mystic' && "bg-mystic-background text-mystic-text",
      currentTheme === 'bloom' && "bg-bloom-background text-bloom-text",
      currentTheme === 'amber' && "bg-amber-background text-amber-text",
    );
  };

  return (
    <div className="relative">
      {categories.map((category, index) => (
        <section key={category.id} className={getSectionClass(index)}>
          <ScentPath className="absolute inset-0" particleCount={20} />
          <ProductsGrid
            products={[]} // You'll need to fetch products based on category
            title={category.name}
            subtitle={category.subtitle}
            featured={true}
          />
        </section>
      ))}
    </div>
  );
};

export default ProductCategories;
