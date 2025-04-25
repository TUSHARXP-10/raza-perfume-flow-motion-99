
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingElement from '@/components/animations/FloatingElement';
import ScentPath from '@/components/animations/ScentPath';

const AmberHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current || !bottleRef.current) return;
    
    const handleScroll = () => {
      if (!bottleRef.current) return;
      
      const scrollPosition = window.scrollY;
      const rotation = scrollPosition * 0.05;
      
      bottleRef.current.style.transform = `rotateY(${rotation}deg)`;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !bottleRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const xPercent = (clientX - rect.left) / rect.width;
      const yPercent = (clientY - rect.top) / rect.height;
      
      // Apply subtle rotation based on mouse position
      bottleRef.current.style.transform = `rotateY(${(xPercent - 0.5) * 15}deg) rotateX(${(yPercent - 0.5) * -10}deg)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    const heroEl = heroRef.current;
    heroEl.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      heroEl.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center py-20 bg-amber-background text-amber-text overflow-hidden"
    >
      {/* Golden rays background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 left-1/2 h-[200vh] w-0.5 bg-gradient-to-b from-amber-accent/5 via-amber-accent/10 to-transparent origin-top"
            style={{ 
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              opacity: 0.3 + (i % 3) * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Animated particles */}
      <ScentPath particleCount={18} />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Perfume bottle with 3D effect */}
        <div className="perspective-1000">
          <div 
            ref={bottleRef}
            className="relative transition-transform duration-500 ease-out transform-style-3d"
          >
            <FloatingElement duration={9} translateY={15} className="relative">
              <div className="bottle-shimmer max-w-[70%] mx-auto">
                <img 
                  src="/placeholder.svg" 
                  alt="Amber Perfume" 
                  className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                />
              </div>
            </FloatingElement>
            
            {/* Amber glow */}
            <div className="absolute inset-0 top-1/3 bg-amber-accent opacity-20 blur-[120px] rounded-full" />
          </div>
        </div>
        
        {/* Text content */}
        <div className="space-y-6">
          <span className="inline-block text-amber-accent font-medium tracking-wider mb-2">AMBER COLLECTION</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
            The <span className="text-amber-accent italic">Golden</span> Elixir<br />of Opulence
          </h1>
          <p className="text-lg opacity-80 leading-relaxed mb-8 max-w-lg">
            Indulge in the warm embrace of amber, a precious resin that has adorned
            royalty for millennia. Our Amber collection captures its rich, honeyed essence
            in every drop.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-amber-primary text-amber-text hover:bg-amber-accent hover:text-amber-background transition-all duration-300 px-8 py-6"
              asChild
            >
              <Link to="/shop">
                Explore Collection
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-amber-accent text-amber-accent hover:bg-amber-accent/20 transition-all duration-300 px-8 py-6"
              asChild
            >
              <Link to="/about">
                Our Heritage
              </Link>
            </Button>
          </div>
          
          {/* Testimonial */}
          <div className="pt-8 border-t border-amber-primary/20">
            <blockquote className="italic text-amber-accent/90 font-serif">
              "The perfect embodiment of luxury in a bottle."
            </blockquote>
            <div className="flex items-center mt-4">
              <div className="w-8 h-8 rounded-full bg-amber-primary/20 mr-3"></div>
              <div>
                <div className="font-medium">Vogue Arabia</div>
                <div className="text-xs opacity-60">Fashion & Lifestyle Magazine</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-4">
        <div className="w-2 h-2 rounded-full bg-amber-accent animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 rounded-full bg-amber-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="w-2 h-2 rounded-full bg-amber-accent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default AmberHero;
