
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingElement from '@/components/animations/FloatingElement';
import ScentPath from '@/components/animations/ScentPath';
import FadeInSection from '@/components/animations/FadeInSection';

const BloomHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const hasMovedRef = useRef(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
      hasMovedRef.current = true;
    };
    
    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
    }
    
    // Set a default subtle movement if no mouse activity
    const interval = setInterval(() => {
      if (!hasMovedRef.current) {
        setMousePosition(prev => ({
          x: Math.sin(Date.now() / 4000) * 0.3,
          y: Math.cos(Date.now() / 4000) * 0.2
        }));
      }
    }, 50);
    
    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(interval);
    };
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center py-20 bg-bloom-background text-bloom-text overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bloom-primary/10 via-bloom-background to-bloom-background" />
      
      {/* Floating particles */}
      <ScentPath particleCount={25} />
      
      {/* Large bloom backdrop */}
      <div 
        className="absolute opacity-20 blur-3xl w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(246, 201, 224, 0.3) 0%, rgba(156, 68, 110, 0.1) 50%, rgba(0, 0, 0, 0) 80%)",
          transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
          transition: "transform 0.5s ease-out"
        }}
      />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left column - Text content */}
        <div className="space-y-6">
          <FadeInSection>
            <span className="inline-block text-bloom-accent font-medium tracking-wider mb-2">BLOOM ELEGANCE</span>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
              <span className="text-bloom-accent italic">Blossom</span> into<br />Divine Radiance
            </h1>
            
            <p className="text-lg opacity-80 leading-relaxed mb-8 max-w-lg">
              Inspired by the most precious florals, our Bloom collection captures 
              the essence of feminine elegance and timeless beauty.
            </p>
          </FadeInSection>
          
          <FadeInSection delay={200}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-bloom-primary text-bloom-text hover:bg-bloom-accent hover:text-bloom-background transition-all duration-300 px-8 py-6"
                asChild
              >
                <Link to="/shop">
                  Discover Fragrances
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-bloom-accent text-bloom-accent hover:bg-bloom-accent/20 transition-all duration-300 px-8 py-6"
                asChild
              >
                <Link to="/collections">
                  Explore Collections
                </Link>
              </Button>
            </div>
          </FadeInSection>
          
          {/* Notes */}
          <FadeInSection delay={400}>
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-bloom-primary/20">
              <div>
                <div className="font-serif text-bloom-accent text-sm mb-1">Floral Notes</div>
                <p className="text-sm opacity-70">Rose, Jasmine, Peony</p>
              </div>
              <div>
                <div className="font-serif text-bloom-accent text-sm mb-1">Sweet Notes</div>
                <p className="text-sm opacity-70">Vanilla, Berry, Amber</p>
              </div>
              <div>
                <div className="font-serif text-bloom-accent text-sm mb-1">Base Notes</div>
                <p className="text-sm opacity-70">Musk, Sandalwood, Patchouli</p>
              </div>
            </div>
          </FadeInSection>
        </div>
        
        {/* Right column - Perfume bottle */}
        <div className="relative flex justify-center">
          <FloatingElement duration={8} translateY={15} className="relative z-10">
            <div 
              className="bottle-shimmer relative"
              style={{
                transform: `rotate(${mousePosition.x * 5}deg)`,
                transition: "transform 1s ease-out"
              }}
            >
              <img 
                src="/placeholder.svg" 
                alt="Bloom Perfume" 
                className="w-full max-w-[60%] mx-auto"
              />
            </div>
          </FloatingElement>
          
          {/* Floral elements */}
          <div 
            className="absolute top-[10%] left-[10%] opacity-70 blur-sm"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
              transition: "transform 1s ease-out"
            }}
          >
            <div className="w-24 h-24 rounded-full bg-bloom-accent/30" />
          </div>
          
          <div 
            className="absolute bottom-[20%] right-[20%] opacity-70 blur-sm"
            style={{
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
              transition: "transform 1.2s ease-out"
            }}
          >
            <div className="w-16 h-16 rounded-full bg-bloom-accent/20" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-bloom-accent opacity-20 rounded-full blur-[100px] animate-pulse" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[10%] right-[10%] w-32 h-32 border border-bloom-accent/10 rounded-full" />
      <div className="absolute bottom-[10%] left-[10%] w-48 h-48 border border-bloom-accent/10 rounded-full" />
    </section>
  );
};

export default BloomHero;
