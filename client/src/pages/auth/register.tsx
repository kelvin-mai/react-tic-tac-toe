import { AuthForm, type AuthFormFieldValues } from '@/components/auth/form';

export const Component = () => {
  const handleSubmit = (data: AuthFormFieldValues) => {
    console.log(data);
  };
  return (
    <>
      <AuthForm onSubmit={handleSubmit} />
    </>
  );
};
