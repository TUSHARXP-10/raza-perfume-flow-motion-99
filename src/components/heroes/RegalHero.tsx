
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ParallaxEffect from '@/components/animations/ParallaxEffect';
import FloatingElement from '@/components/animations/FloatingElement';
import ScentPath from '@/components/animations/ScentPath';

const RegalHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = heroRef.current!.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      heroRef.current!.style.setProperty('--mouse-x', `${x}`);
      heroRef.current!.style.setProperty('--mouse-y', `${y}`);
    };
    
    const heroEl = heroRef.current;
    heroEl.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center py-20 bg-regal-background text-regal-text overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(
          800px circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), 
          rgba(138, 108, 62, 0.15), 
          transparent
        )`
      }}
    >
      {/* Animated particles */}
      <ScentPath particleCount={15} />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-regal-accent/30 to-transparent" />
      <div className="absolute top-0 left-1/2 w-[1px] h-screen bg-gradient-to-b from-transparent via-regal-accent/20 to-transparent" />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left column - Text content */}
        <div className="order-2 md:order-1 space-y-6 max-w-lg">
          <ParallaxEffect speed={0.05}>
            <span className="inline-block text-regal-accent font-medium tracking-wider mb-2">THE ART OF LUXURY FRAGRANCE</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
              Unveil the <span className="text-regal-accent italic">Royal</span> Essence
            </h1>
            <p className="text-lg opacity-80 leading-relaxed mb-8">
              Exquisite fragrances crafted with rare ingredients that embody luxury 
              and sophistication. Experience the regal elegance of Raza Perfumes.
            </p>
          </ParallaxEffect>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-regal-primary hover:bg-regal-accent text-white transition-all duration-300 px-8 py-6"
              asChild
            >
              <Link to="/shop">
                Explore Collection
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-regal-accent text-regal-accent hover:bg-regal-accent hover:text-regal-background transition-all duration-300 px-8 py-6"
              asChild
            >
              <Link to="/about">
                Our Story
              </Link>
            </Button>
          </div>
          
          {/* Notes section */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-regal-primary/20">
            <div>
              <div className="font-serif text-regal-accent text-sm mb-1">Top Notes</div>
              <p className="text-sm opacity-70">Bergamot, Saffron, Cardamom</p>
            </div>
            <div>
              <div className="font-serif text-regal-accent text-sm mb-1">Heart Notes</div>
              <p className="text-sm opacity-70">Rose, Oudh, Amber</p>
            </div>
            <div>
              <div className="font-serif text-regal-accent text-sm mb-1">Base Notes</div>
              <p className="text-sm opacity-70">Vanilla, Musk, Sandalwood</p>
            </div>
          </div>
        </div>
        
        {/* Right column - Perfume bottle */}
        <div className="order-1 md:order-2 relative">
          <FloatingElement duration={8} translateY={15} className="relative z-10">
            <div className="bottle-shimmer relative mx-auto max-w-[80%]">
              <img 
                src="/placeholder.svg" 
                alt="Raza Luxury Perfume" 
                className="w-full h-auto object-contain"
              />
            </div>
          </FloatingElement>
          
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-regal-accent opacity-10 rounded-full blur-[80px] animate-pulse" />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="text-xs text-regal-accent mb-2 tracking-widest">SCROLL</div>
        <div className="h-12 w-[1px] bg-gradient-to-b from-regal-accent/80 to-transparent" />
      </div>
    </section>
  );
};

export default RegalHero;
