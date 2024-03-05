import { useNavigate } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import { AuthForm, type AuthFormFieldValues } from '@/components/auth/form';
import { useToast } from '@/components/ui';

export const Component = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { register } = useAuth();
  const gameRedirect = searchParams.get('game');
  const toLink = gameRedirect
    ? `/auth/login?game=${gameRedirect}`
    : '/auth/login';
  const handleSubmit = async (data: AuthFormFieldValues) => {
    const error = await register(data);
    if (error) {
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
        description: error,
      });
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
            to={toLink}
          >
            Login
          </Link>
        </p>
      </div>
      <AuthForm onSubmit={handleSubmit} />
    </>
  );
};
