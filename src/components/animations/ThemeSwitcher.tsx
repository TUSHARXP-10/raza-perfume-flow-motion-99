
import React from 'react';
import { useTheme, ThemeType } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { currentTheme, changeTheme, isTransitioning } = useTheme();
  
  const themes: { name: ThemeType; label: string }[] = [
    { name: 'regal', label: 'Regal' },
    { name: 'mystic', label: 'Mystic' },
    { name: 'bloom', label: 'Bloom' },
    { name: 'amber', label: 'Amber' },
  ];
  
  const getButtonClass = (theme: ThemeType) => {
    const baseClass = "relative px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-300 overflow-hidden";
    
    if (theme === currentTheme) {
      return cn(
        baseClass,
        "border-b-2",
        theme === 'regal' && "border-regal-accent text-regal-accent",
        theme === 'mystic' && "border-mystic-accent text-mystic-accent",
        theme === 'bloom' && "border-bloom-accent text-bloom-accent",
        theme === 'amber' && "border-amber-accent text-amber-accent",
      );
    }
    
    return cn(
      baseClass,
      "opacity-50 hover:opacity-80",
      theme === 'regal' && "text-regal-text",
      theme === 'mystic' && "text-mystic-text",
      theme === 'bloom' && "text-bloom-text",
      theme === 'amber' && "text-amber-text",
    );
  };

  return (
    <div className={cn(
      "inline-flex bg-opacity-10 backdrop-blur-md rounded-lg p-1 transition-all duration-300",
      isTransitioning ? "opacity-50 pointer-events-none" : "opacity-100",
      className
    )}>
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => changeTheme(theme.name)}
          className={getButtonClass(theme.name)}
          disabled={isTransitioning}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
