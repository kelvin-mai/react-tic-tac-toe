import { getUser, logout } from '@/api/auth';
import { Button } from '@/components/ui';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Component = () => {
  useEffect(() => {
    getUser().then(console.log);
  }, []);
  return (
    <>
      <p>Hello World</p>
      <Link to='/game'>
        <Button>GAME</Button>
      </Link>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};
