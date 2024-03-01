import { useNavigate } from 'react-router';

import { login } from '@/api/auth';
import { AuthForm, type AuthFormFieldValues } from '@/components/auth/form';
import { Link } from 'react-router-dom';

export const Component = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: AuthFormFieldValues) => {
    const res = await login(data);
    if (res.success) {
      navigate('/');
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
            to='/auth/register'
          >
            Register
          </Link>
        </p>
      </div>
      <AuthForm onSubmit={handleSubmit} />
    </>
  );
};
