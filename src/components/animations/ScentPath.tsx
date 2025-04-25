
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface ScentPathProps {
  className?: string;
  particleCount?: number;
  maxSize?: number;
  speed?: number;
}

const ScentPath: React.FC<ScentPathProps> = ({
  className,
  particleCount = 15,
  maxSize = 30,
  speed = 3
}) => {
  const { currentTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedY: number;
  }>>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Initialize particles
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: rect.height + Math.random() * 100, // Start below the container
      size: 5 + Math.random() * maxSize,
      opacity: 0.1 + Math.random() * 0.4,
      speedY: 1 + Math.random() * speed
    }));
    
    setParticles(newParticles);
    
    // Animation loop
    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (!containerRef.current) return;
      
      // Throttle updates to improve performance
      if (time - lastTime < 40) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move particle up
          let y = particle.y - particle.speedY;
          
          // Reset if off screen
          if (y < -particle.size * 2) {
            y = rect.height + particle.size;
            return {
              ...particle,
              y,
              x: Math.random() * rect.width,
              size: 5 + Math.random() * maxSize,
              opacity: 0.1 + Math.random() * 0.4
            };
          }
          
          return { ...particle, y };
        })
      );
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, maxSize, speed]);
  
  const getParticleColor = () => {
    switch(currentTheme) {
      case 'regal': return 'rgba(212, 175, 55, VAR_OPACITY)'; // Gold
      case 'mystic': return 'rgba(184, 196, 219, VAR_OPACITY)'; // Light blue
      case 'bloom': return 'rgba(246, 201, 224, VAR_OPACITY)'; // Light pink
      case 'amber': return 'rgba(255, 215, 0, VAR_OPACITY)'; // Gold/amber
      default: return 'rgba(255, 255, 255, VAR_OPACITY)';
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: getParticleColor().replace('VAR_OPACITY', particle.opacity.toString()),
            filter: 'blur(8px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default ScentPath;
