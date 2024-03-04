import { useNavigate } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';

import { login } from '@/api/auth';
import { AuthForm, type AuthFormFieldValues } from '@/components/auth/form';
import { useToast } from '@/components/ui';

export const Component = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const gameRedirect = searchParams.get('game');
  const toLink = gameRedirect
    ? `/auth/register?game=${gameRedirect}`
    : '/auth/register';
  const handleSubmit = async (data: AuthFormFieldValues) => {
    const res = await login(data);
    if (res.success) {
      toast({
        title: 'Login Success',
      });
      if (gameRedirect) {
        navigate(`/game/${gameRedirect}`);
      } else {
        navigate('/');
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Login error',
        description: res.error,
      });
    }
  };
  return (
    <>
      <div className='mb-4 space-y-2'>
        <h1 className='text-2xl font-bold'>Log in</h1>
        <p className='text-sm text-slate-500'>
          Don't have an account?{' '}
          <Link
            className='font-semibold text-indigo-500 hover:underline'
            to={toLink}
          >
            Register
          </Link>
        </p>
      </div>
      <AuthForm onSubmit={handleSubmit} />
    </>
  );
};
