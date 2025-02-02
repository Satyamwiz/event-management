import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { register as registerUser } from '@/lib/auth';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  department?: string;
  studentId?: string;
  year?: number;
 
}


const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterData>();
  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterData) => {
    try {
      const user = await registerUser(data);
      toast.success('Registration successful!');
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          {...register('name', { 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            maxLength: { value: 50, message: 'Name must not exceed 50 characters' }
          })}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
          error={errors.password?.message}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            {...register('role', { required: 'Role is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        {(selectedRole === 'student' || selectedRole === 'teacher') && (
          <Input
            label="Department"
            {...register('department', { 
              required: 'Department is required for students and teachers'
            })}
            error={errors.department?.message}
          />
        )}

        {selectedRole === 'student' && (
          <>
            <Input
              label="Student ID"
              {...register('studentId', { 
                required: 'Student ID is required for students'
              })}
              error={errors.studentId?.message}
            />

            <Input
              label="Year"
              type="number"
              {...register('year', { 
                required: 'Year is required for students',
                min: { value: 1, message: 'Year must be between 1 and 4' },
                max: { value: 4, message: 'Year must be between 1 and 4' }
              })}
              error={errors.year?.message}
            />
          </>
        )}


        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  );
};

export default Register;