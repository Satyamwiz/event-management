import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { GraduationCap as Graduation } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

const AuthLayout: React.FC = () => {
  const user = getCurrentUser();

  if (user) {
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Graduation className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Event Management System
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;