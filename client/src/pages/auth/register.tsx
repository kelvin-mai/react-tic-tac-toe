import { register } from '@/api/auth';
import { AuthForm, type AuthFormFieldValues } from '@/components/auth/form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const Component = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: AuthFormFieldValues) => {
    const res = await register(data);
    if (res.success) {
      navigate('/');
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
