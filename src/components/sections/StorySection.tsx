
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ParallaxEffect from '@/components/animations/ParallaxEffect';
import FadeInSection from '@/components/animations/FadeInSection';

const StorySection: React.FC = () => {
  const { currentTheme } = useTheme();
  
  const getSectionClass = () => {
    return cn(
      "py-24 relative overflow-hidden",
      currentTheme === 'regal' && "bg-regal-background text-regal-text",
      currentTheme === 'mystic' && "bg-mystic-background text-mystic-text",
      currentTheme === 'bloom' && "bg-bloom-background text-bloom-text",
      currentTheme === 'amber' && "bg-amber-background text-amber-text",
    );
  };
  
  const getAccentClass = () => {
    return cn(
      "font-serif",
      currentTheme === 'regal' && "text-regal-accent",
      currentTheme === 'mystic' && "text-mystic-accent",
      currentTheme === 'bloom' && "text-bloom-accent",
      currentTheme === 'amber' && "text-amber-accent",
    );
  };
  
  const getButtonClass = () => {
    return cn(
      "mt-6",
      currentTheme === 'regal' && "bg-regal-primary hover:bg-regal-accent text-white",
      currentTheme === 'mystic' && "bg-mystic-primary hover:bg-mystic-accent text-white",
      currentTheme === 'bloom' && "bg-bloom-primary hover:bg-bloom-accent text-white",
      currentTheme === 'amber' && "bg-amber-primary hover:bg-amber-accent text-white",
    );
  };

  return (
    <section className={getSectionClass()}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-[300px] h-[300px] rounded-full blur-[100px]",
              currentTheme === 'regal' && "bg-regal-primary",
              currentTheme === 'mystic' && "bg-mystic-primary",
              currentTheme === 'bloom' && "bg-bloom-primary",
              currentTheme === 'amber' && "bg-amber-primary",
            )}
            style={{
              top: `${30 + i * 20}%`,
              left: `${10 + i * 30}%`,
              opacity: 0.2 + i * 0.1
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <ParallaxEffect speed={0.05}>
            <FadeInSection>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Raza Perfumes Story" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                
                {/* Decorative accent */}
                <div className={cn(
                  "absolute -bottom-4 -right-4 w-32 h-32 -z-10 rounded-lg",
                  currentTheme === 'regal' && "bg-regal-accent/20",
                  currentTheme === 'mystic' && "bg-mystic-accent/20",
                  currentTheme === 'bloom' && "bg-bloom-accent/20",
                  currentTheme === 'amber' && "bg-amber-accent/20",
                )} />
              </div>
            </FadeInSection>
          </ParallaxEffect>
          
          {/* Right column - Text content */}
          <div className="space-y-6">
            <FadeInSection>
              <span className={cn("inline-block font-medium tracking-wider mb-2", getAccentClass())}>
                OUR HERITAGE
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight mb-6">
                A Legacy of Perfume Artistry
              </h2>
              
              <p className="opacity-80 leading-relaxed">
                Raza Perfumes was born from a passion for the finest fragrances and a deep respect 
                for the ancient art of perfumery. Our journey began with a vision to create 
                scents that transcend the ordinary, capturing moments, memories and emotions 
                in each carefully crafted bottle.
              </p>
              
              <p className="opacity-80 leading-relaxed">
                Every Raza fragrance tells a story - a narrative woven from the finest natural 
                ingredients sourced from across the globe, combined with innovative techniques 
                that honor centuries-old traditions while embracing modern sophistication.
              </p>
              
              <Button className={getButtonClass()} asChild>
                <Link to="/about">
                  Discover Our Story
                </Link>
              </Button>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
