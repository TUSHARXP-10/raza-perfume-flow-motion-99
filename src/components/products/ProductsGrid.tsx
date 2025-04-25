
import React from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import FadeInSection from '@/components/animations/FadeInSection';

interface ProductsGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  featured?: boolean;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  title, 
  subtitle,
  featured = false 
}) => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <FadeInSection>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">{title}</h2>
            </FadeInSection>
          )}
          
          {subtitle && (
            <FadeInSection delay={300}>
              <p className="opacity-70 max-w-2xl mx-auto">{subtitle}</p>
            </FadeInSection>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <FadeInSection key={product.id} delay={100 * index}>
            <ProductCard product={product} featured={featured} />
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
