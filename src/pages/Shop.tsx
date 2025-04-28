import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';

// Product categories and their descriptions
const categories = [
  { id: 'casual', name: 'Casual', description: 'Everyday fragrances for a subtle, fresh appeal' },
  { id: 'premium', name: 'Premium', description: 'Sophisticated scents for special occasions' },
  { id: 'luxury', name: 'Luxury', description: 'Exclusive fragrances for the most discerning' },
];

// Generate product data
const generateProducts = () => {
  const products = [];
  const casualPriceRange = { min: 30, max: 80 };
  const premiumPriceRange = { min: 90, max: 200 };
  const luxuryPriceRange = { min: 250, max: 500 };

  // Helper function to generate random price within range
  const getRandomPrice = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1) + min);

  // Generate 20 products for each category
  categories.forEach(category => {
    const priceRange = 
      category.id === 'casual' ? casualPriceRange :
      category.id === 'premium' ? premiumPriceRange :
      luxuryPriceRange;

    for (let i = 1; i <= 20; i++) {
      products.push({
        id: `${category.id}-${i}`,
        name: `${category.name} Perfume ${i}`,
        category: category.id,
        price: getRandomPrice(priceRange.min, priceRange.max),
        description: `A captivating ${category.id} fragrance that ${i % 2 === 0 ? 'enchants with its subtle notes' : 'delights with its unique blend'}.`,
        image: `/images/perfumes/${category.id}${i}.jpg`, // Placeholder for actual images
      });
    }
  });

  return products;
};

const products = generateProducts();

const Shop = () => {
  const { currentTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc'>('price-asc');
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Filter and sort products
  const filteredProducts = products.filter(product =>
    selectedCategory === 'all' ? true : product.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    return b.price - a.price;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className={cn(
            "text-4xl font-serif mb-4",
            currentTheme === 'regal' && "text-regal-accent",
            currentTheme === 'mystic' && "text-mystic-accent",
            currentTheme === 'bloom' && "text-bloom-accent",
            currentTheme === 'amber' && "text-amber-accent"
          )}>Our Collection</h1>
          <p className="text-lg opacity-80">Discover your signature scent</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={cn(
              "transition-all duration-300",
              selectedCategory === 'all' && currentTheme === 'regal' && "bg-regal-accent text-regal-background",
              selectedCategory === 'all' && currentTheme === 'mystic' && "bg-mystic-accent text-mystic-background",
              selectedCategory === 'all' && currentTheme === 'bloom' && "bg-bloom-accent text-bloom-background",
              selectedCategory === 'all' && currentTheme === 'amber' && "bg-amber-accent text-amber-background"
            )}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={cn(
                "transition-all duration-300",
                selectedCategory === category.id && currentTheme === 'regal' && "bg-regal-accent text-regal-background",
                selectedCategory === category.id && currentTheme === 'mystic' && "bg-mystic-accent text-mystic-background",
                selectedCategory === category.id && currentTheme === 'bloom' && "bg-bloom-accent text-bloom-background",
                selectedCategory === category.id && currentTheme === 'amber' && "bg-amber-accent text-amber-background"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex justify-end mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc')}
            className={cn(
              "px-4 py-2 rounded-md border",
              currentTheme === 'regal' && "border-regal-border bg-regal-background text-regal-text",
              currentTheme === 'mystic' && "border-mystic-border bg-mystic-background text-mystic-text",
              currentTheme === 'bloom' && "border-bloom-border bg-bloom-background text-bloom-text",
              currentTheme === 'amber' && "border-amber-border bg-amber-background text-amber-text"
            )}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className={cn(
                "group rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg",
                currentTheme === 'regal' && "border-regal-border bg-regal-card",
                currentTheme === 'mystic' && "border-mystic-border bg-mystic-card",
                currentTheme === 'bloom' && "border-bloom-border bg-bloom-card",
                currentTheme === 'amber' && "border-amber-border bg-amber-card"
              )}
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gray-100">
                <div className={cn(
                  "w-full h-full flex items-center justify-center text-4xl font-serif",
                  currentTheme === 'regal' && "text-regal-accent",
                  currentTheme === 'mystic' && "text-mystic-accent",
                  currentTheme === 'bloom' && "text-bloom-accent",
                  currentTheme === 'amber' && "text-amber-accent"
                )}>
                  R
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <p className="text-sm opacity-70 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">${product.price}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className={cn(
                      "transition-all duration-300",
                      currentTheme === 'regal' && "bg-regal-accent text-regal-background hover:bg-regal-accent/90",
                      currentTheme === 'mystic' && "bg-mystic-accent text-mystic-background hover:bg-mystic-accent/90",
                      currentTheme === 'bloom' && "bg-bloom-accent text-bloom-background hover:bg-bloom-accent/90",
                      currentTheme === 'amber' && "bg-amber-accent text-amber-background hover:bg-amber-accent/90"
                    )}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;