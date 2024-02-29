import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
      <p>Hello World</p>
      <Link to='/game'>
        <button>GAME</button>
      </Link>
    </>
  );
};
