import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getGame, type GameWithPlayers, joinGame, playGame } from '@/api/game';
import { useToast } from '@/components/ui';
import { GameBoard, GameInfo } from '@/components/game';
import { User, getUser } from '@/api/auth';
import { useSocket } from '@/hooks/use-socket';

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const socket = useSocket();
  const [game, setGame] = useState<GameWithPlayers | undefined>();

  if (!id) {
    return navigate('/');
  }

  const navigateOnComplete = (game: GameWithPlayers) => {
    if (
      game.currentState?.status === 'win' ||
      game.currentState?.status === 'tie'
    ) {
      navigate(`/game/${id}/replay`, { replace: true });
    }
  };

  const refetch = async () => {
    const { game } = await getGame(id);
    navigateOnComplete(game);
    setGame(game);
  };

  const init = async () => {
    const { game } = await getGame(id);
    const { user } = await getUser();
    navigateOnComplete(game);
    socket.emit('join_room', id);
    if (user && game && !game.playerOId && game.playerXId !== user.id) {
      const { success } = await joinGame(id!);
      socket.emit('join_game', id);
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
    setGame(game);
  };

  const handleClick = async (state: any) => {
    const res = await playGame(id!, state);
    if (res.success) {
      socket.emit('play_game', id);
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
      navigateOnComplete(res.game);
    } else {
      toast({
        variant: 'destructive',
        title: 'Game Error',
        description: res.error,
      });
    }
  };

  const onPlayerJoin = (data: any) => {
    toast({
      title: 'Challenge Accepted',
      description: `${data.user.username} has joined this game.`,
    });
  };

  const onPlayerConnect = (data: any) => {
    toast({
      title: 'Player connected',
      description: `${data.user.username} has connected to this game.`,
    });
  };

  const onPlayerDisconnect = (data: any) => {
    toast({
      variant: 'destructive',
      title: 'Player disconnected',
      description: `${data.user.username} has disconnected from this game.`,
    });
  };

  useEffect(() => {
    socket.on('connected', (data) => console.log('connected with data', data));
    socket.on('join_room', onPlayerConnect);
    socket.on('join_game', onPlayerJoin);
    socket.on('play_game', refetch);
    socket.on('leave', onPlayerDisconnect);
    init();
    () => {
      socket.off('connected');
      socket.off('join_room');
      socket.off('join_game');
      socket.off('play_game');
      socket.off('leave');
    };
  }, [id]);

  return (
    <>
      <h1 className='text-4xl font-bold leading-none tracking-light text-center py-4'>
        Game
      </h1>
      {game && (
        <>
          <GameBoard state={game.currentState!.state} onClick={handleClick} />
          <GameInfo game={game} />
        </>
      )}
    </>
  );
};
