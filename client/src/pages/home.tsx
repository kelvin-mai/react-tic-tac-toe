import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { type User, getUser, logout } from '@/api/auth';
import { type Game, type GameWithPlayers, getGames } from '@/api/game';
import { Button, Skeleton } from '@/components/ui';
import { JoinCard, Leaderboard, ResumeCard } from '@/components/game';
import { Player, getTopPlayers } from '@/api/player';

export const Component = () => {
  const [availableGames, setAvailableGames] = useState<GameWithPlayers[]>([]);
  const [resumeGames, setResumeGames] = useState<GameWithPlayers[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [players, setPlayers] = useState<Player[]>();
  const init = async () => {
    const { user } = await getUser();
    setCurrentUser(user);
    const available = await getGames('available');
    setAvailableGames(available.games);
    if (user) {
      const resume = await getGames('resume');
      setResumeGames(resume.games);
    }
    const top = await getTopPlayers();
    setPlayers(top.players);
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
      <h1 className='text-4xl font-bold leading-none tracking-tight text-center mb-4'>
        Tic Tac Toe
      </h1>
      {players && <Leaderboard players={players} />}
      {currentUser && (
        <div className='grid sm:grid-cols-2 gap-4 pt-4'>
          <JoinCard games={availableGames} />
          <ResumeCard games={resumeGames} />
        </div>
      )}
    </main>
  );
};
