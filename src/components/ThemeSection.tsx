
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import RegalHero from './heroes/RegalHero';
import MysticHero from './heroes/MysticHero';
import BloomHero from './heroes/BloomHero';
import AmberHero from './heroes/AmberHero';
import ThemeSwitcher from './animations/ThemeSwitcher';

const ThemeSection: React.FC = () => {
  const { currentTheme, isTransitioning } = useTheme();
  
  return (
    <div className={`relative transition-opacity duration-500 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      {/* Current theme's hero */}
      {currentTheme === 'regal' && <RegalHero />}
      {currentTheme === 'mystic' && <MysticHero />}
      {currentTheme === 'bloom' && <BloomHero />}
      {currentTheme === 'amber' && <AmberHero />}
      
      {/* Theme switcher */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <ThemeSwitcher className="bg-black/30 backdrop-blur-md p-2 rounded-full shadow-xl" />
      </div>
    </div>
  );
};

export default ThemeSection;
