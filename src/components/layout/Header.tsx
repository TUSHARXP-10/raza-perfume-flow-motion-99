
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { SearchIcon, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const { currentTheme } = useTheme();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user } = useUserAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getHeaderClass = () => {
    const baseClass = "fixed w-full z-50 transition-all duration-500 ease-in-out";
    
    if (isScrolled) {
      return cn(
        baseClass,
        "bg-opacity-80 backdrop-blur-md shadow-md py-2",
        currentTheme === 'regal' && "bg-regal-background",
        currentTheme === 'mystic' && "bg-mystic-background",
        currentTheme === 'bloom' && "bg-bloom-background",
        currentTheme === 'amber' && "bg-amber-background",
      );
    }
    
    return cn(
      baseClass,
      "bg-transparent py-4",
    );
  };
  
  const getButtonClass = () => {
    const baseClass = "border-2 transition-all";
    
    return cn(
      baseClass,
      currentTheme === 'regal' && "border-regal-accent text-regal-accent hover:bg-regal-accent hover:text-regal-background",
      currentTheme === 'mystic' && "border-mystic-accent text-mystic-accent hover:bg-mystic-accent hover:text-mystic-background",
      currentTheme === 'bloom' && "border-bloom-accent text-bloom-accent hover:bg-bloom-accent hover:text-bloom-background",
      currentTheme === 'amber' && "border-amber-accent text-amber-accent hover:bg-amber-accent hover:text-amber-background",
    );
  };
  
  const getLogoClass = () => {
    return cn(
      "text-2xl sm:text-3xl font-serif italic font-medium",
      currentTheme === 'regal' && "text-regal-accent",
      currentTheme === 'mystic' && "text-mystic-accent",
      currentTheme === 'bloom' && "text-bloom-accent",
      currentTheme === 'amber' && "text-amber-accent",
    );
  };
  
  const getIconClass = () => {
    return cn(
      "h-5 w-5",
      currentTheme === 'regal' && "text-regal-text",
      currentTheme === 'mystic' && "text-mystic-text",
      currentTheme === 'bloom' && "text-bloom-text",
      currentTheme === 'amber' && "text-amber-text",
    );
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className={getHeaderClass()}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className={getLogoClass()}>Raza</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm uppercase tracking-wider font-medium relative group",
              "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0",
              "after:transition-all after:duration-300 hover:after:w-full",
              currentTheme === 'regal' && "after:bg-regal-accent text-regal-text hover:text-regal-accent",
              currentTheme === 'mystic' && "after:bg-mystic-accent text-mystic-text hover:text-mystic-accent",
              currentTheme === 'bloom' && "after:bg-bloom-accent text-bloom-text hover:text-bloom-accent",
              currentTheme === 'amber' && "after:bg-amber-accent text-amber-text hover:text-amber-accent"
            )}
          >Home</Link>
          <Link 
            to="/shop" 
            className={cn(
              "text-sm uppercase tracking-wider font-medium relative group",
              "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0",
              "after:transition-all after:duration-300 hover:after:w-full",
              currentTheme === 'regal' && "after:bg-regal-accent text-regal-text hover:text-regal-accent",
              currentTheme === 'mystic' && "after:bg-mystic-accent text-mystic-text hover:text-mystic-accent",
              currentTheme === 'bloom' && "after:bg-bloom-accent text-bloom-text hover:text-bloom-accent",
              currentTheme === 'amber' && "after:bg-amber-accent text-amber-text hover:text-amber-accent"
            )}
          >Shop</Link>
          <Link 
            to="/collections" 
            className={cn(
              "text-sm uppercase tracking-wider font-medium relative group",
              "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0",
              "after:transition-all after:duration-300 hover:after:w-full",
              currentTheme === 'regal' && "after:bg-regal-accent text-regal-text hover:text-regal-accent",
              currentTheme === 'mystic' && "after:bg-mystic-accent text-mystic-text hover:text-mystic-accent",
              currentTheme === 'bloom' && "after:bg-bloom-accent text-bloom-text hover:text-bloom-accent",
              currentTheme === 'amber' && "after:bg-amber-accent text-amber-text hover:text-amber-accent"
            )}
          >Collections</Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm uppercase tracking-wider font-medium relative group",
              "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0",
              "after:transition-all after:duration-300 hover:after:w-full",
              currentTheme === 'regal' && "after:bg-regal-accent text-regal-text hover:text-regal-accent",
              currentTheme === 'mystic' && "after:bg-mystic-accent text-mystic-text hover:text-mystic-accent",
              currentTheme === 'bloom' && "after:bg-bloom-accent text-bloom-text hover:text-bloom-accent",
              currentTheme === 'amber' && "after:bg-amber-accent text-amber-text hover:text-amber-accent"
            )}
          >About</Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-sm uppercase tracking-wider font-medium relative group",
              "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0",
              "after:transition-all after:duration-300 hover:after:w-full",
              currentTheme === 'regal' && "after:bg-regal-accent text-regal-text hover:text-regal-accent",
              currentTheme === 'mystic' && "after:bg-mystic-accent text-mystic-text hover:text-mystic-accent",
              currentTheme === 'bloom' && "after:bg-bloom-accent text-bloom-text hover:text-bloom-accent",
              currentTheme === 'amber' && "after:bg-amber-accent text-amber-text hover:text-amber-accent"
            )}
          >Contact</Link>
        </nav>
        
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="hover:opacity-80 transition-opacity">
            <SearchIcon className={getIconClass()} />
          </button>
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="hover:opacity-80 transition-opacity focus:outline-none"
              aria-label="Account"
            >
              <User className={getIconClass()} />
            </button>
            <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
          </div>
          <Link to="/cart" aria-label="Cart" className="hover:opacity-80 transition-opacity relative">
            <ShoppingCart className={getIconClass()} />
            {totalItems > 0 && (
              <span className={`absolute -top-2 -right-2 text-xs h-5 w-5 flex items-center justify-center rounded-full ${
                currentTheme === 'regal' ? 'bg-regal-accent text-regal-background' :
                currentTheme === 'mystic' ? 'bg-mystic-accent text-mystic-background' :
                currentTheme === 'bloom' ? 'bg-bloom-accent text-bloom-background' :
                'bg-amber-accent text-amber-background'
              }`}>
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={toggleMenu} aria-label="Menu">
            <Menu className={getIconClass()} />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full z-50 shadow-lg py-4 ${
          currentTheme === 'regal' ? 'bg-regal-background' :
          currentTheme === 'mystic' ? 'bg-mystic-background' :
          currentTheme === 'bloom' ? 'bg-bloom-background' :
          'bg-amber-background'
        } bg-opacity-95 backdrop-blur-sm transform transition-all duration-300`}>
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="text-sm uppercase tracking-wider font-medium" onClick={toggleMenu}>Home</Link>
            <Link to="/shop" className="text-sm uppercase tracking-wider font-medium" onClick={toggleMenu}>Shop</Link>
            <Link to="/collections" className="text-sm uppercase tracking-wider font-medium" onClick={toggleMenu}>Collections</Link>
            <Link to="/about" className="text-sm uppercase tracking-wider font-medium" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="text-sm uppercase tracking-wider font-medium" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
