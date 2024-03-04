import { Link } from 'react-router-dom';
import { Button } from '../ui';

export const Navbar = () => {
  return (
    <nav className='pt-4 pb-2 border-bottom-2 shadow-md'>
      <div className='container flex justify-between'>
        <Link to='/'>
          <h2 className='font-bold text-xl'>Tic Tac Toe</h2>
        </Link>
        <Link to='/auth/login'>
          <Button>Login</Button>
        </Link>
      </div>
    </nav>
  );
};
