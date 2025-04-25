
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div
      ref={sectionRef}
      className={cn(
        "transition-opacity duration-1000 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
