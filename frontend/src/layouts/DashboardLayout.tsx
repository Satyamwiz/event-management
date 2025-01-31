import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { getCurrentUser } from '@/lib/auth';

const DashboardLayout: React.FC = () => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

// import React, { useEffect } from 'react';
// import { Outlet, Navigate, useNavigate } from 'react-router-dom';
// import Sidebar from '@/components/dashboard/Sidebar';
// import Header from '@/components/dashboard/Header';
// import { getCurrentUser } from '@/lib/auth';

// const DashboardLayout: React.FC = () => {
//   const user = getCurrentUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       const currentPath = window.location.pathname;
//       const rolePath = `/${user.role.toLowerCase()}`;
      
//       // Redirect to role-specific dashboard if not already there
//       if (!currentPath.includes(rolePath)) {
//         navigate('/login');
//       }
//     }
//   }, [user, navigate]);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="lg:pl-72">
//         <Header />
//         <main className="py-10">
//           <div className="px-4 sm:px-6 lg:px-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;