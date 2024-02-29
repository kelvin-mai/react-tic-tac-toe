import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getUser, login } from '@/api/auth';
import { AuthForm, type AuthFormFieldValues } from '@/components/auth/form';

export const Component = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getUser().then((data) => {
      if (data.data.user) {
        navigate('/', { replace: true });
      }
    });
  }, []);
  const handleSubmit = async (data: AuthFormFieldValues) => {
    console.log(data);
    const res = await login(data);
    if (res.data.success) {
      navigate('/');
    }
  };
  return (
    <>
      <AuthForm onSubmit={handleSubmit} />
    </>
  );
};
