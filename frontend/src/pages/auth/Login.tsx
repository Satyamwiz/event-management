import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { login } from '@/lib/auth';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password', { required: 'Password is required' })}
        error={errors.password?.message}
      />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
};

export default Login;