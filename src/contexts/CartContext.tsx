
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../data/products';
import { useToast } from "@/components/ui/use-toast";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Updated cart",
          description: `${product.name} quantity updated to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      });
      
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items removed from your cart",
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      subtotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};
