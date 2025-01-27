import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '@/lib/auth';
import { toast } from 'react-hot-toast';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex lg:items-center lg:gap-x-6">
              <span className="text-sm font-medium text-gray-900">
                {user?.name}
              </span>
              <span className="text-sm text-gray-500">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-2 text-sm font-medium text-gray-900 hover:text-gray-500"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;