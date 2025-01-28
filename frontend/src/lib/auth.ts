import { User } from '@/types/auth';
import axios from 'axios';
// Mock admin user for testing
const MOCK_ADMIN: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'ADMIN',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock authentication
let currentUser: User | null = null;

export const login = async (email: string, password: string): Promise<User> => {
  // For demo purposes, only allow the mock admin to login
  if (email === MOCK_ADMIN.email && password === 'admin123') {
    currentUser = MOCK_ADMIN;
    localStorage.setItem('user', JSON.stringify(MOCK_ADMIN));
    return MOCK_ADMIN;
  }
  throw new Error('Invalid credentials');
};



export const logout = () => {
  currentUser = null;
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  const stored = localStorage.getItem('user');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  return null;
};

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  department?: string;
  studentId?: string;
  year?: number;
  googleCalendarId?: string;
}


export const register = async (userData: RegisterData) => {
  try {
    const { data } = await axios.post('/api/users/register', userData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Registration failed');
  }
};