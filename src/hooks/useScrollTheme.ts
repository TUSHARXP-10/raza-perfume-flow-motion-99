
import { useEffect, useCallback } from 'react';
import { useTheme, ThemeType } from '@/contexts/ThemeContext';

export const useScrollTheme = () => {
  const { changeTheme } = useTheme();

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / (totalHeight - windowHeight)) * 100;

    // Change theme based on scroll position
    if (scrollPercentage < 25) {
      changeTheme('regal');
    } else if (scrollPercentage < 50) {
      changeTheme('mystic');
    } else if (scrollPercentage < 75) {
      changeTheme('bloom');
    } else {
      changeTheme('amber');
    }
  }, [changeTheme]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};
