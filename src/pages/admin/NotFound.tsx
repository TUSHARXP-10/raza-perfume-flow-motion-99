
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const AdminNotFound = () => {
  return (
    <div className="min-h-screen bg-admin-background text-admin-foreground flex items-center justify-center">
      <div className="text-center p-8">
        <div className="text-9xl font-serif text-admin-accent mb-6">404</div>
        <h1 className="text-3xl font-medium mb-4">Page Not Found</h1>
        <p className="text-admin-foreground/70 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable in the admin panel.
        </p>
        <div className="space-x-4">
          <Button 
            variant="outline" 
            className="border-admin-border"
            asChild
          >
            <Link to="/admin">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button 
            className="bg-admin-accent hover:bg-admin-accent-hover text-admin-background"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Website
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotFound;
