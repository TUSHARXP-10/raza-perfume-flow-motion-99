
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { UserAuthProvider } from "@/contexts/UserAuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CollectionPage from "./pages/CollectionPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Shop from "./pages/Shop";

// Admin routes
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";
import AdminNotFound from "./pages/admin/NotFound";

const queryClient = new QueryClient();

// Admin Auth Guard component
const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
  // Check if user is authenticated by seeing if there's a user in localStorage
  const isAuthenticated = localStorage.getItem('adminUser') !== null;
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <CartProvider>
          <AdminAuthProvider>
            <UserAuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Routes>
                {/* Main website routes */}
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/collection/:categoryId" element={<CollectionPage />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                <Route 
                  path="/admin" 
                  element={
                    <RequireAdminAuth>
                      <Dashboard />
                    </RequireAdminAuth>
                  } 
                />
                <Route 
                  path="/admin/products" 
                  element={
                    <RequireAdminAuth>
                      <Products />
                    </RequireAdminAuth>
                  } 
                />
                <Route 
                  path="/admin/customers" 
                  element={
                    <RequireAdminAuth>
                      <Customers />
                    </RequireAdminAuth>
                  } 
                />
                <Route 
                  path="/admin/orders" 
                  element={
                    <RequireAdminAuth>
                      <Orders />
                    </RequireAdminAuth>
                  } 
                />
                <Route 
                  path="/admin/settings" 
                  element={
                    <RequireAdminAuth>
                      <Settings />
                    </RequireAdminAuth>
                  } 
                />
                <Route path="/admin/*" element={<AdminNotFound />} />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </UserAuthProvider>
          </AdminAuthProvider>
        </CartProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
