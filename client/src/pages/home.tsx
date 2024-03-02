import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { type User, getUser, logout } from '@/api/auth';
import { type Game, type GameWithPlayers, getGames } from '@/api/game';
import { Button } from '@/components/ui';
import { JoinCard, Leaderboard, ResumeCard } from '@/components/game';

export const Component = () => {
  const [availableGames, setAvailableGames] = useState<GameWithPlayers[]>([]);
  const [resumeGames, setResumeGames] = useState<GameWithPlayers[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const init = async () => {
    const { user } = await getUser();
    console.log(user);
    setCurrentUser(user);
    const available = await getGames('available');
    setAvailableGames(available.games);
    if (user) {
      const resume = await getGames('mine');
      setResumeGames(resume.games);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <main className='container'>
      <h1>Hello {currentUser ? currentUser.username : 'World'}</h1>
      {!currentUser ? (
        <Link to='/auth/login'>
          <Button>Log in</Button>
        </Link>
      ) : (
        <Button onClick={logout}>Log out</Button>
      )}
      <Leaderboard />
      {currentUser && (
        <div className='grid sm:grid-cols-2 gap-4 pt-8'>
          <JoinCard games={availableGames} />
          <ResumeCard games={resumeGames} />
        </div>
      )}
    </main>
  );
};
