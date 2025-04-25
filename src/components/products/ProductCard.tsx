
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingElement from '@/components/animations/FloatingElement';

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, featured = false }) => {
  const { currentTheme } = useTheme();
  const { addToCart } = useCart();
  
  const getCardClass = () => {
    return cn(
      "group relative overflow-hidden transition-all duration-500 rounded-lg",
      featured ? "p-4 sm:p-6" : "p-3 sm:p-4",
      currentTheme === 'regal' && "bg-regal-muted/20",
      currentTheme === 'mystic' && "bg-mystic-muted/20",
      currentTheme === 'bloom' && "bg-bloom-muted/20",
      currentTheme === 'amber' && "bg-amber-muted/20",
      className
    );
  };
  
  const getAccentClass = () => {
    return cn(
      currentTheme === 'regal' && "text-regal-accent",
      currentTheme === 'mystic' && "text-mystic-accent",
      currentTheme === 'bloom' && "text-bloom-accent",
      currentTheme === 'amber' && "text-amber-accent",
    );
  };
  
  const getButtonClass = () => {
    return cn(
      "transition-all duration-300",
      currentTheme === 'regal' && "bg-regal-primary text-regal-text hover:bg-regal-accent",
      currentTheme === 'mystic' && "bg-mystic-primary text-mystic-text hover:bg-mystic-accent",
      currentTheme === 'bloom' && "bg-bloom-primary text-bloom-text hover:bg-bloom-accent",
      currentTheme === 'amber' && "bg-amber-primary text-amber-text hover:bg-amber-accent",
    );
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className={getCardClass()}>
      {/* Product image with hover effect */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded mb-4 aspect-[3/4]">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick add button */}
          <Button 
            className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0", getButtonClass())}
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
          
          {/* New badge */}
          {product.new && (
            <span className={cn(
              "absolute top-3 right-3 text-xs px-2 py-1 rounded font-medium",
              currentTheme === 'regal' ? "bg-regal-accent text-regal-background" :
              currentTheme === 'mystic' ? "bg-mystic-accent text-mystic-background" :
              currentTheme === 'bloom' ? "bg-bloom-accent text-bloom-background" :
              "bg-amber-accent text-amber-background"
            )}>
              New
            </span>
          )}
        </div>
        
        {/* Product info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className={cn("font-serif text-lg transition-colors group-hover:text-opacity-100", featured && "text-xl", getAccentClass())}>
              {product.name}
            </h3>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-xs">{product.rating}</span>
            </div>
          </div>
          
          {product.arabicName && (
            <p className="text-sm font-arabic opacity-70">{product.arabicName}</p>
          )}
          
          <p className="font-medium">${product.price}</p>
          
          {featured && (
            <p className="text-sm opacity-70 line-clamp-2 mt-2">{product.description}</p>
          )}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {product.topNotes.slice(0, 2).map((note, i) => (
              <span 
                key={i} 
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full bg-opacity-20",
                  currentTheme === 'regal' ? "bg-regal-primary" :
                  currentTheme === 'mystic' ? "bg-mystic-primary" :
                  currentTheme === 'bloom' ? "bg-bloom-primary" :
                  "bg-amber-primary"
                )}
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
