import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GraduationCap as Graduation, LayoutDashboard, Calendar, Users, Menu, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

const getNavigationByRole = (role: string) => {
  const baseNavigation = [
    { name: 'Dashboard', href: `/${role.toLowerCase()}/dashboard`, icon: LayoutDashboard },
    { name: 'Events', href: `/${role.toLowerCase()}/events`, icon: Calendar },
  ];

  if (role === 'ADMIN') {
    return [...baseNavigation, { name: 'Users', href: '/admin/users', icon: Users }];
  }

  return baseNavigation;
};

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = getCurrentUser();
  const navigation = user ? getNavigationByRole(user.role) : [];

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          className="fixed right-4 top-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-y-0 z-50 flex w-72 flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/" className="flex items-center gap-2">
              <Graduation className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">EMS</span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                          location.pathname === item.href
                            ? 'bg-gray-50 text-blue-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;