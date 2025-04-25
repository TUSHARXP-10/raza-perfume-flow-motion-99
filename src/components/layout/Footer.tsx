
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const { currentTheme } = useTheme();
  
  const getFooterClass = () => {
    return cn(
      "pt-16 pb-8 relative overflow-hidden",
      currentTheme === 'regal' && "bg-regal-background text-regal-text",
      currentTheme === 'mystic' && "bg-mystic-background text-mystic-text",
      currentTheme === 'bloom' && "bg-bloom-background text-bloom-text",
      currentTheme === 'amber' && "bg-amber-background text-amber-text",
    );
  };
  
  const getAccentClass = () => {
    return cn(
      "font-serif",
      currentTheme === 'regal' && "text-regal-accent",
      currentTheme === 'mystic' && "text-mystic-accent",
      currentTheme === 'bloom' && "text-bloom-accent",
      currentTheme === 'amber' && "text-amber-accent",
    );
  };
  
  const getIconClass = () => {
    return cn(
      "h-5 w-5 transition-transform hover:scale-110",
      currentTheme === 'regal' && "text-regal-accent",
      currentTheme === 'mystic' && "text-mystic-accent",
      currentTheme === 'bloom' && "text-bloom-accent",
      currentTheme === 'amber' && "text-amber-accent",
    );
  };

  return (
    <footer className={getFooterClass()}>
      {/* Decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <h2 className={`text-3xl ${getAccentClass()}`}>Raza</h2>
              <p className="mt-2 text-sm opacity-80">Perfume Artistry</p>
            </Link>
            <p className="text-sm opacity-60 leading-relaxed">
              Crafting exceptional fragrances that evoke emotion and create lasting impressions. A symphony of scents for the discerning.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className={getIconClass()} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className={getIconClass()} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className={getIconClass()} />
              </a>
            </div>
          </div>
          
          {/* Shop column */}
          <div>
            <h3 className="text-lg font-medium mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-sm opacity-60 hover:opacity-100 transition-opacity">All Perfumes</Link></li>
              <li><Link to="/shop?category=oriental" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Oriental Collection</Link></li>
              <li><Link to="/shop?category=woody" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Woody Collection</Link></li>
              <li><Link to="/shop?category=floral" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Floral Collection</Link></li>
              <li><Link to="/shop?category=spicy" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Spicy Collection</Link></li>
            </ul>
          </div>
          
          {/* Company column */}
          <div>
            <h3 className="text-lg font-medium mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm opacity-60 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/our-story" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Our Story</Link></li>
              <li><Link to="/contact" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link to="/careers" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Careers</Link></li>
              <li><Link to="/sustainability" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Sustainability</Link></li>
            </ul>
          </div>
          
          {/* Support column */}
          <div>
            <h3 className="text-lg font-medium mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/help" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Help Center</Link></li>
              <li><Link to="/shipping" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="text-sm opacity-60 hover:opacity-100 transition-opacity">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-xs opacity-60">&copy; {new Date().getFullYear()} Raza Perfumes. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <a href="#" className="text-xs opacity-60 hover:opacity-100 transition-opacity">Terms</a>
            <span className="mx-2 opacity-60">·</span>
            <a href="#" className="text-xs opacity-60 hover:opacity-100 transition-opacity">Privacy</a>
            <span className="mx-2 opacity-60">·</span>
            <a href="#" className="text-xs opacity-60 hover:opacity-100 transition-opacity">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
