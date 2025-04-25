
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-admin-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-admin-card rounded-lg shadow-lg border border-admin-border p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-admin-accent">Raza</h1>
            <p className="mt-1 text-admin-foreground/70">Admin Panel</p>
          </div>
          
          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                  placeholder="admin"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                  placeholder="password123"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-admin-accent hover:bg-admin-accent-hover text-admin-background font-medium py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </div>
          </form>
          
          {/* Demo credentials */}
          <div className="mt-6 text-center text-sm text-admin-foreground/70">
            <p>Demo credentials:</p>
            <div className="flex justify-center gap-4 mt-2">
              <div className="bg-admin-background border border-admin-border rounded-md px-3 py-1">
                <p>Username: <span className="text-admin-accent">admin</span></p>
                <p>Password: <span className="text-admin-accent">password123</span></p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to main site link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-admin-accent hover:underline text-sm">
            Return to main website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
