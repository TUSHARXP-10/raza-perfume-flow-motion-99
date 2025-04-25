
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxEffectProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({ 
  children, 
  className,
  speed = 0.1 
}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const elementTop = elementRef.current.getBoundingClientRect().top;
      const elementVisible = window.innerHeight;
      
      if (elementTop < elementVisible) {
        const scrolled = window.scrollY;
        setOffset(scrolled * speed);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return (
    <div 
      ref={elementRef} 
      className={cn(className)}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};

export default ParallaxEffect;
