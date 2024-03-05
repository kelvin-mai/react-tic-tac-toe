import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getGame, type GameWithPlayers } from '@/api/game';
import { ReplayBoard } from '@/components/game';
import { Skeleton } from '@/components/ui';

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameWithPlayers | undefined>();

  const init = async () => {
    const { game } = await getGame(id!);
    if (
      game.currentState?.status === 'win' ||
      game.currentState?.status === 'tie'
    ) {
      setGame(game);
    } else {
      navigate(`/game/${id}`);
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <>
      <h1 className='text-4xl font-bold leading-none tracking-light text-center pb-4'>
        Replay Game
      </h1>
      {game && game.playerO && (
        <h2 className='text-2xl font-bold leading-none tracking-light text-center py-4'>
          {game.playerX.username} vs {game.playerO.username}
        </h2>
      )}
      {game ? (
        <ReplayBoard game={game} />
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-center'>
            <Skeleton className='w-[600px] h-[600px]' />
          </div>
          <div className='flex items-center justify-center'>
            <Skeleton className='w-[700px] h-[200px]' />
          </div>
        </div>
      )}
    </>
  );
};
