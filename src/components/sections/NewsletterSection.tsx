
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import FadeInSection from '@/components/animations/FadeInSection';

const NewsletterSection: React.FC = () => {
  const { currentTheme } = useTheme();
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const getSectionClass = () => {
    return cn(
      "py-24 relative",
      currentTheme === 'regal' && "bg-regal-background text-regal-text",
      currentTheme === 'mystic' && "bg-mystic-background text-mystic-text",
      currentTheme === 'bloom' && "bg-bloom-background text-bloom-text",
      currentTheme === 'amber' && "bg-amber-background text-amber-text",
    );
  };
  
  const getAccentClass = () => {
    return cn(
      currentTheme === 'regal' && "text-regal-accent",
      currentTheme === 'mystic' && "text-mystic-accent",
      currentTheme === 'bloom' && "text-bloom-accent",
      currentTheme === 'amber' && "text-amber-accent",
    );
  };
  
  const getInputClass = () => {
    return cn(
      "bg-transparent border rounded-l-md py-6 focus:ring-0",
      currentTheme === 'regal' && "border-regal-primary/30 focus:border-regal-accent",
      currentTheme === 'mystic' && "border-mystic-primary/30 focus:border-mystic-accent",
      currentTheme === 'bloom' && "border-bloom-primary/30 focus:border-bloom-accent",
      currentTheme === 'amber' && "border-amber-primary/30 focus:border-amber-accent",
    );
  };
  
  const getButtonClass = () => {
    return cn(
      "rounded-r-md px-6 py-6",
      currentTheme === 'regal' && "bg-regal-primary hover:bg-regal-accent text-white",
      currentTheme === 'mystic' && "bg-mystic-primary hover:bg-mystic-accent text-white",
      currentTheme === 'bloom' && "bg-bloom-primary hover:bg-bloom-accent text-white",
      currentTheme === 'amber' && "bg-amber-primary hover:bg-amber-accent text-white",
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail('');
  };

  return (
    <section className={getSectionClass()}>
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-xl mx-auto text-center">
            <span className={cn("inline-block font-medium tracking-wider mb-2", getAccentClass())}>
              STAY CONNECTED
            </span>
            
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Subscribe to Our Newsletter
            </h2>
            
            <p className="opacity-70 mb-8">
              Be the first to know about new releases, exclusive offers, and the stories behind our fragrances.
            </p>
            
            <form onSubmit={handleSubmit} className="flex">
              <Input
                type="email"
                placeholder="Your email address"
                className={getInputClass()}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className={getButtonClass()}>
                Subscribe
              </Button>
            </form>
            
            <p className="mt-4 text-xs opacity-50">
              By subscribing, you agree to receive marketing emails from Raza Perfumes.
              You can unsubscribe at any time.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default NewsletterSection;
