import axios from 'axios';
import { User } from '@/types/auth';


// Define the API base URL
const API_URL = '/api/users';

// Interface for registration data
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

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

// Logout function
export const logout = async (): Promise<void> => {
 
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  localStorage.removeItem('user');

};

// Get current user function
export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const getEventCount = async (): Promise<number> => {
  const { data } = await axios.get(`/api/events/counts`, { withCredentials: true });
  return data;
};



// Get user count
export const getUserCount = async (): Promise<number> => {
  const { data } = await axios.get(`${API_URL}/count`, { withCredentials: true });
  const {count} = data;
  console.log('User cereount:', data);
  return count;
};

export const getStudentCount = async (): Promise<number> => {
  const { data } = await axios.get(`${API_URL}/count`, { withCredentials: true });
  const {student} = data;
  return student;
}

// Register function
export const register = async (userData: RegisterData): Promise<User> => {
  const { data } = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
  return data;
};

// Get user profile
export const getUserProfile = async (): Promise<User> => {
  const { data } = await axios.get(`${API_URL}/profile`, { withCredentials: true });
  return data;
};

// Update user profile
export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  const { data } = await axios.put(`${API_URL}/profile`, userData, { withCredentials: true });
  return data;
};

// Get all users (admin only)
export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(API_URL, { withCredentials: true });
  return data;
};
