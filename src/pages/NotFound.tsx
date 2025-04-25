
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const NotFound: React.FC = () => {
  const { currentTheme } = useTheme();
  
  const getPageClass = () => {
    return cn(
      "min-h-screen flex flex-col",
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
    <div className={getPageClass()}>
      <Header />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-lg py-16">
          <div className={cn("font-serif text-8xl mb-4", getAccentClass())}>404</div>
          <h1 className="font-serif text-3xl mb-6">Page Not Found</h1>
          <p className="opacity-70 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Button className={getButtonClass()} asChild>
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
