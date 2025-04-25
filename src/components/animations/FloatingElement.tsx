
import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  translateY?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  duration = 6,
  delay = 0,
  translateY = 20
}) => {
  return (
    <div
      className={cn("transform", className)}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-${translateY}px); }
          }
        `}
      </style>
      {children}
    </div>
  );
};

export default FloatingElement;
