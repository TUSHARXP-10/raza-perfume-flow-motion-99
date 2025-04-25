
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define theme types
export type ThemeType = 'regal' | 'mystic' | 'bloom' | 'amber';

interface ThemeContextType {
  currentTheme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'regal',
  changeTheme: () => {},
  isTransitioning: false
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('regal');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeTheme = (theme: ThemeType) => {
    if (theme === currentTheme) return;
    
    setIsTransitioning(true);
    
    // Add a small delay to allow animation to happen
    setTimeout(() => {
      setCurrentTheme(theme);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Animation duration
    }, 200);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
