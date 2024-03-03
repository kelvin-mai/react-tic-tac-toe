import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getGame } from '@/api/game';
import { Skeleton } from '@/components/ui';

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const init = async () => {
    const { game } = await getGame(id!);
    if (
      game.currentState?.status === 'win' ||
      game.currentState?.status === 'tie'
    ) {
      navigate(`/game/${id}/replay`, { replace: true });
    } else {
      navigate(`/game/${id}/play`, { replace: true });
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <>
      <h1 className='text-4xl font-bold leading-none tracking-light text-center py-4'>
        Connecting...
      </h1>
      <div className='flex items-center justify-center'>
        <Skeleton className='w-[600px] h-[600px]' />
      </div>
    </>
  );
};
