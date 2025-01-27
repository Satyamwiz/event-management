import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/dashboard/admin/Dashboard';
import AdminEvents from './pages/dashboard/admin/Events';
import AdminUsers from './pages/dashboard/admin/Users';
import TeacherDashboard from './pages/dashboard/teacher/Dashboard';
import TeacherEvents from './pages/dashboard/teacher/Events';
import StudentDashboard from './pages/dashboard/student/Dashboard';
import StudentEvents from './pages/dashboard/student/Events';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/users" element={<AdminUsers />} />

            {/* Teacher Routes */}
            <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/events" element={<TeacherEvents />} />

            {/* Student Routes */}
            <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/events" element={<StudentEvents />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;