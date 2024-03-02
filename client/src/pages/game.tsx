import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { GameBoard } from '@/components/game';
import { type BoardState, getGame, playGame, joinGame } from '@/api/game';
import { useToast } from '@/components/ui';

export const Component = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<BoardState | undefined>();
  const init = async () => {
    const { game } = await getGame(id!);
    setGameState(game.currentState?.state);
    if (!game.playerOId) {
      const { success } = await joinGame(id!);
      if (success) {
        toast({
          title: 'Success',
          description: 'Successfully joined this game',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      }
    }
  };

  const handleClick = async (state: any) => {
    const { game } = await playGame(id!, state);
    setGameState(game.currentState?.state);
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <main className='container pt-8'>
      {gameState && <GameBoard state={gameState} onClick={handleClick} />}
    </main>
  );
};
