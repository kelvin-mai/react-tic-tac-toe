import { useEffect, useState } from 'react';

import { type GameWithPlayers, getGames } from '@/api/game';
import { type Player, getTopPlayers } from '@/api/player';
import { useAuth } from '@/hooks/use-auth';
import { JoinCard, Leaderboard, ResumeCard } from '@/components/game';

export const Component = () => {
  const [availableGames, setAvailableGames] = useState<GameWithPlayers[]>([]);
  const [resumeGames, setResumeGames] = useState<GameWithPlayers[]>([]);
  const [players, setPlayers] = useState<Player[]>();
  const { user } = useAuth();
  const init = async () => {
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
    <main className='container pt-8'>
      <h1 className='text-4xl font-bold leading-none tracking-tight text-center pb-4'>
        Tic Tac Toe
      </h1>
      {players && <Leaderboard players={players} />}
      {user && (
        <div className='grid sm:grid-cols-2 gap-4 pt-4'>
          <JoinCard games={availableGames} />
          <ResumeCard games={resumeGames} />
        </div>
      )}
    </main>
  );
};
