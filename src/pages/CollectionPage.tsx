
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import ProductsGrid from '@/components/products/ProductsGrid';
import { getProductsByCategory } from '@/data/products';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CollectionPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { currentTheme } = useTheme();
  const products = getProductsByCategory(categoryId || '');
  
  const categoryNames = {
    casual: 'Casual Collection',
    premium: 'Premium Collection',
    luxury: 'Luxury Collection'
  };
  
  const title = categoryNames[categoryId as keyof typeof categoryNames] || 'Collection';
  
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000",
      currentTheme === 'regal' && "bg-regal-background text-regal-text",
      currentTheme === 'mystic' && "bg-mystic-background text-mystic-text",
      currentTheme === 'bloom' && "bg-bloom-background text-bloom-text",
      currentTheme === 'amber' && "bg-amber-background text-amber-text",
    )}>
      <Header />
      
      <main className="py-24">
        <ProductsGrid
          products={products}
          title={title}
          subtitle={`Explore our complete ${title.toLowerCase()} of fine fragrances`}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default CollectionPage;
