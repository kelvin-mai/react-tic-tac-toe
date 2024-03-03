import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getGame, type GameWithPlayers, joinGame, playGame } from '@/api/game';
import { ReplayBoard } from '@/components/game/replay-board';
import { useToast } from '@/components/ui';
import { GameBoard } from '@/components/game';

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [game, setGame] = useState<GameWithPlayers | undefined>();

  const init = async () => {
    const { game } = await getGame(id!);
    if (
      game.currentState?.status === 'win' ||
      game.currentState?.status === 'tie'
    ) {
      navigate(`/game/${id}/replay`, { replace: true });
    }
    setGame(game);
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
    const res = await playGame(id!, state);
    if (res.success) {
      setGame(res.game);
      if (res.game.currentState?.status === 'win') {
        toast({
          title: 'You win',
          description: 'You won this game!',
        });
      }
      if (res.game.currentState?.status === 'tie') {
        toast({
          title: 'Tie Game',
          description: 'The game resulted in a tie, there is no winner.',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Game Error',
        description: res.error,
      });
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <main className='container'>
      <h1 className='text-4xl font-bold leading-none tracking-light text-center py-4'>
        Game
      </h1>
      {(game?.currentState?.status === 'new' ||
        game?.currentState?.status === 'ongoing') && (
        <GameBoard state={game.currentState.state} onClick={handleClick} />
      )}
      {(game?.currentState?.status === 'win' ||
        game?.currentState?.status === 'tie') &&
        game.gameStates && <ReplayBoard game={game} />}
    </main>
  );
};
