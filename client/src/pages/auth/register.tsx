import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { register } from '@/api/auth';
import { AuthForm, type AuthFormFieldValues } from '@/components/auth/form';
import { useToast } from '@/components/ui';

export const Component = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSubmit = async (data: AuthFormFieldValues) => {
    const res = await register(data);
    if (res.success) {
      if (res.success) {
        toast({
          title: 'Login Success',
        });
        navigate('/');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login error',
          description: res.error,
        });
      }
    }
  };
  return (
    <>
      <div className='mb-4 space-y-2'>
        <h1 className='text-2xl font-bold'>Register</h1>
        <p className='text-sm text-slate-500'>
          Already have an account?{' '}
          <Link
            className='font-semibold text-indigo-500 hover:underline'
            to='/auth/login'
          >
            Login
          </Link>
        </p>
      </div>
      <AuthForm onSubmit={handleSubmit} />
    </>
  );
};
