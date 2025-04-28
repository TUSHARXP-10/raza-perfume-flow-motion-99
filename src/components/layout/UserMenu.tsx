import React from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useUserAuth();
  const { currentTheme } = useTheme();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    onClose();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  const getMenuClass = () => {
    return cn(
      "absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 border transition-all duration-300",
      currentTheme === 'regal' && "bg-regal-card border-regal-border",
      currentTheme === 'mystic' && "bg-mystic-card border-mystic-border",
      currentTheme === 'bloom' && "bg-bloom-card border-bloom-border",
      currentTheme === 'amber' && "bg-amber-card border-amber-border",
      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
    );
  };

  const getLinkClass = () => {
    return cn(
      "block px-4 py-2 text-sm hover:opacity-80 transition-opacity",
      currentTheme === 'regal' && "text-regal-text",
      currentTheme === 'mystic' && "text-mystic-text",
      currentTheme === 'bloom' && "text-bloom-text",
      currentTheme === 'amber' && "text-amber-text"
    );
  };

  return (
    <div className={getMenuClass()}>
      {user ? (
        <>
          <div className="px-4 py-2 border-b border-opacity-10">
            <p className="text-sm font-medium">{user.username}</p>
            <p className="text-xs opacity-70">{user.email}</p>
          </div>
          <Link
            to="/account"
            className={getLinkClass()}
            onClick={onClose}
          >
            My Account
          </Link>
          <Link
            to="/orders"
            className={getLinkClass()}
            onClick={onClose}
          >
            My Orders
          </Link>
          <button
            onClick={handleLogout}
            className={cn(getLinkClass(), "w-full text-left hover:text-red-500")}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link
            to="/signin"
            className={getLinkClass()}
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className={getLinkClass()}
            onClick={onClose}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default UserMenu;