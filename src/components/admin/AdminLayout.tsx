
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminUser, logout } = useAdminAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="h-5 w-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users className="h-5 w-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart className="h-5 w-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-admin-background text-admin-foreground">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-admin-card border-r border-admin-border transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo section */}
        <div className={cn(
          "p-4 flex items-center border-b border-admin-border",
          sidebarCollapsed ? "justify-center" : "justify-between"
        )}>
          {!sidebarCollapsed && (
            <Link to="/admin" className="flex items-center">
              <span className="text-xl font-serif text-admin-accent">Raza</span>
              <span className="ml-2 text-sm opacity-70">Admin</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <span className="text-xl font-serif text-admin-accent">R</span>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-full hover:bg-admin-muted/30 text-admin-accent"
          >
            {sidebarCollapsed ? 
              <ChevronRight className="h-5 w-5" /> : 
              <ChevronLeft className="h-5 w-5" />
            }
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-admin-accent/10 text-admin-accent" 
                    : "text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground",
                  sidebarCollapsed ? "justify-center" : "justify-start"
                )}
              >
                {item.icon}
                {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* User section */}
        <div className={cn(
          "p-4 border-t border-admin-border",
          sidebarCollapsed ? "items-center justify-center" : ""
        )}>
          <div className={cn(
            "flex items-center mb-4",
            sidebarCollapsed ? "justify-center" : "justify-start"
          )}>
            <div className="h-8 w-8 rounded-full bg-admin-accent text-admin-background flex items-center justify-center">
              {adminUser?.username.charAt(0).toUpperCase()}
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">{adminUser?.username}</p>
                <p className="text-xs opacity-70 capitalize">{adminUser?.role}</p>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className={cn(
              "w-full text-admin-foreground/70 hover:text-admin-foreground hover:bg-admin-danger/20",
              sidebarCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-admin-card border border-admin-border text-admin-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-admin-card border-r border-admin-border flex flex-col">
            {/* Logo section */}
            <div className="p-4 flex items-center justify-between border-b border-admin-border">
              <Link to="/admin" className="flex items-center">
                <span className="text-xl font-serif text-admin-accent">Raza</span>
                <span className="ml-2 text-sm opacity-70">Admin</span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-1 rounded-full hover:bg-admin-muted/30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex-1 py-6 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-3 rounded-md transition-colors",
                      location.pathname === item.path 
                        ? "bg-admin-accent/10 text-admin-accent" 
                        : "text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* User section */}
            <div className="p-4 border-t border-admin-border">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-admin-accent text-admin-background flex items-center justify-center">
                  {adminUser?.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{adminUser?.username}</p>
                  <p className="text-xs opacity-70 capitalize">{adminUser?.role}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="w-full text-admin-foreground/70 hover:text-admin-foreground hover:bg-admin-danger/20 justify-start"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-admin-card border-b border-admin-border h-16 flex items-center px-6">
          <h1 className="text-lg font-medium">
            {navItems.find(item => location.pathname === item.path)?.name || 'Admin Panel'}
          </h1>
        </header>
        
        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
