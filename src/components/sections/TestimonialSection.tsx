
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import FadeInSection from '@/components/animations/FadeInSection';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Raza Perfumes' creations are nothing short of extraordinary. The complexity and longevity of their scents truly set them apart from other luxury fragrances.",
    author: "Vogue Arabia",
    position: "Fashion Magazine",
  },
  {
    id: 2,
    text: "Each fragrance tells a unique story that unfolds throughout the day. The attention to detail in every bottle is apparent from the first spray to the final notes.",
    author: "Emirates Luxury",
    position: "Lifestyle Publication",
  },
  {
    id: 3,
    text: "The perfect embodiment of artisanal perfumery. Raza has mastered the delicate balance between tradition and innovation in every scent they create.",
    author: "Harper's Bazaar",
    position: "Fashion & Beauty Magazine",
  }
];

const TestimonialSection: React.FC = () => {
  const { currentTheme } = useTheme();
  
  const getSectionClass = () => {
    return cn(
      "py-24 relative",
      currentTheme === 'regal' && "bg-regal-muted text-regal-text",
      currentTheme === 'mystic' && "bg-mystic-muted text-mystic-text",
      currentTheme === 'bloom' && "bg-bloom-muted text-bloom-text",
      currentTheme === 'amber' && "bg-amber-muted text-amber-text",
    );
  };
  
  const getQuoteClass = () => {
    return cn(
      currentTheme === 'regal' && "text-regal-accent",
      currentTheme === 'mystic' && "text-mystic-accent",
      currentTheme === 'bloom' && "text-bloom-accent",
      currentTheme === 'amber' && "text-amber-accent",
    );
  };
  
  const getCardClass = () => {
    return cn(
      "bg-opacity-20 backdrop-blur-sm p-8 rounded-lg relative h-full",
      currentTheme === 'regal' && "bg-regal-background border border-regal-primary/10",
      currentTheme === 'mystic' && "bg-mystic-background border border-mystic-primary/10",
      currentTheme === 'bloom' && "bg-bloom-background border border-bloom-primary/10",
      currentTheme === 'amber' && "bg-amber-background border border-amber-primary/10",
    );
  };

  return (
    <section className={getSectionClass()}>
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">What Others Say</h2>
            <p className="opacity-70 max-w-lg mx-auto">
              Discover why connoisseurs and publications alike celebrate our unique approach to perfumery.
            </p>
          </div>
        </FadeInSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeInSection key={testimonial.id} delay={index * 200}>
              <div className={getCardClass()}>
                {/* Quote mark */}
                <div className={`${getQuoteClass()} text-6xl opacity-20 absolute top-4 left-4 font-serif`}>"</div>
                
                <div className="relative">
                  <blockquote className="text-lg leading-relaxed italic mb-8">
                    {testimonial.text}
                  </blockquote>
                  
                  <div className="flex items-center">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className={cn(
                        "w-12 h-12 rounded-full mr-4 flex items-center justify-center",
                        currentTheme === 'regal' && "bg-regal-primary/20",
                        currentTheme === 'mystic' && "bg-mystic-primary/20",
                        currentTheme === 'bloom' && "bg-bloom-primary/20",
                        currentTheme === 'amber' && "bg-amber-primary/20",
                      )}>
                        <span className={cn("font-serif text-lg", getQuoteClass())}>
                          {testimonial.author[0]}
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm opacity-70">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
