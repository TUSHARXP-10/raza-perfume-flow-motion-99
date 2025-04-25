
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScentPath from '@/components/animations/ScentPath';
import FloatingElement from '@/components/animations/FloatingElement';

const MysticHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current || !particlesRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!particlesRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current!.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      
      particlesRef.current.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
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
      className="relative min-h-screen flex items-center py-20 bg-mystic-background text-mystic-text overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mystic-accent/40 via-transparent to-transparent" />
      </div>
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 transition-transform duration-200 ease-out pointer-events-none">
        <ScentPath particleCount={20} />
      </div>
      
      {/* Wave effect at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 animate-wave" style={{
        background: "linear-gradient(to top, rgba(106, 123, 145, 0.2), transparent)"
      }} />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-5 gap-8 items-center relative z-10">
        {/* Left column - Perfume bottle */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <FloatingElement duration={10} translateY={20}>
            <div className="relative max-w-[70%] mx-auto lg:ml-auto">
              <div className="bottle-shimmer">
                <img 
                  src="/placeholder.svg" 
                  alt="Mystic Perfume" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Glowing circle behind the bottle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-mystic-accent/20 blur-[60px] -z-10" />
            </div>
          </FloatingElement>
        </div>
        
        {/* Right column - Text content */}
        <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
          <span className="inline-block text-mystic-accent font-medium tracking-wider mb-2">MYSTICAL FRAGRANCES</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
            <span className="text-mystic-accent italic">Transcend</span> into<br />Ethereal Realms
          </h1>
          <p className="text-lg opacity-80 leading-relaxed mb-8 max-w-lg">
            Journey beyond ordinary scents with our mystical collection of fragrances 
            that evoke otherworldly sensations. Each drop tells a story of ancient wisdom.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-mystic-primary text-mystic-text hover:bg-mystic-accent hover:text-mystic-background transition-all duration-300 px-8 py-6"
              asChild
            >
              <Link to="/shop">
                Discover the Collection
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-mystic-accent text-mystic-accent hover:bg-mystic-accent/20 transition-all duration-300 px-8 py-6"
              asChild
            >
              <Link to="/about">
                The Journey
              </Link>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="flex items-center gap-4 pt-12">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-mystic-accent/50" />
            <div className="text-mystic-accent font-serif italic text-lg">Timeless Elegance</div>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-mystic-accent/50" />
          </div>
        </div>
      </div>
      
      {/* Ethereal circles */}
      <div className="absolute top-1/4 right-[5%] w-32 h-32 rounded-full border border-mystic-accent/20 animate-pulse opacity-70" />
      <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full border border-mystic-accent/20 animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-[15%] w-16 h-16 rounded-full border border-mystic-accent/20 animate-pulse opacity-40" style={{ animationDelay: '1.5s' }} />
    </section>
  );
};

export default MysticHero;
