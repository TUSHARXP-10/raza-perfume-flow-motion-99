
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define admin user type
interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'editor';
}

// Define context type
interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AdminAuthContext = createContext<AdminAuthContextType>({
  adminUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

// Mock admin users for demo purposes
// In a real application, this would be stored in a database
const mockAdmins = [
  {
    id: '1',
    username: 'admin',
    password: 'password123',
    role: 'admin' as const,
  },
  {
    id: '2',
    username: 'editor',
    password: 'editor123',
    role: 'editor' as const,
  }
];

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('adminUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setAdminUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('adminUser');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const admin = mockAdmins.find(
      user => user.username === username && user.password === password
    );
    
    if (admin) {
      const { password: _, ...adminUserData } = admin;
      setAdminUser(adminUserData);
      localStorage.setItem('adminUser', JSON.stringify(adminUserData));
      toast({
        title: "Login successful",
        description: `Welcome back, ${adminUserData.username}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
