
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import ProductsGrid from './ProductsGrid';
import { getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
  }
];

const ProductCategories: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

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
      {categories.map((category, index) => {
        const allProducts = getProductsByCategory(category.id);
        const previewProducts = allProducts.slice(0, 6);
        const totalProducts = allProducts.length;
        
        return (
          <section key={category.id} className={getSectionClass(index)}>
            <ScentPath className="absolute inset-0" particleCount={20} />
            <ProductsGrid
              products={previewProducts}
              title={category.name}
              subtitle={category.subtitle}
              featured={true}
            />
            
            <div className="container mx-auto px-4 text-center mt-12">
              <Button
                onClick={() => navigate(`/collection/${category.id}`)}
                className={cn(
                  "group text-lg px-8 py-6 transition-all duration-500",
                  currentTheme === 'regal' && "bg-regal-primary hover:bg-regal-accent",
                  currentTheme === 'mystic' && "bg-mystic-primary hover:bg-mystic-accent",
                  currentTheme === 'bloom' && "bg-bloom-primary hover:bg-bloom-accent",
                  currentTheme === 'amber' && "bg-amber-primary hover:bg-amber-accent",
                )}
              >
                Explore All {totalProducts} Products
                <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProductCategories;
