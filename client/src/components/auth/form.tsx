import type { FC } from 'react';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';

const schema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, 'Username must be at least 4 characters')
    .max(31, 'Username must be less than 32 characters'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 2 characters')
    .max(255, 'Password must be less than 256 characters'),
});

export type AuthFormFieldValues = z.infer<typeof schema>;

type AuthFormProps = {
  onSubmit: SubmitHandler<AuthFormFieldValues>;
};

export const AuthForm: FC<AuthFormProps> = ({ onSubmit }) => {
  const form = useForm<AuthFormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  return (
    <Form {...form}>
      <form className='grid gap-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
};
