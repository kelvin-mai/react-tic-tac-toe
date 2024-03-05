import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import type { SocketRoomData, SocketUserData } from '@/api/types';
import { getGame, type GameWithPlayers, joinGame, playGame } from '@/api/game';
import { useSocket } from '@/hooks/use-socket';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/components/ui';
import { GameBoard, GameInfo } from '@/components/game';

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const socket = useSocket();
  const [game, setGame] = useState<GameWithPlayers | undefined>();
  const [activePlayers, setActivePlayers] = useState<string[]>([]);
  const { user } = useAuth();

  if (!id) {
    return navigate('/');
  }

  const refetch = async () => {
    const { game } = await getGame(id);
    setGame(game);
  };

  const init = async () => {
    const { game } = await getGame(id);
    socket.emit('join_room', id);
    if (user) {
      if (game && !game.playerOId && game.playerXId !== user.id) {
        const { success } = await joinGame(id!);
        if (success) {
          toast({
            title: 'Success',
            description: 'Successfully joined this game',
          });
          refetch();
          socket.emit('join_game', id);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Something went wrong',
          });
        }
      } else if (game.playerOId !== user.id && game.playerXId !== user.id) {
        toast({
          variant: 'destructive',
          title: 'Game full',
          description:
            'You can not join this game, the game is already has maximum players and is in progress.',
        });
        navigate('/');
      }
      setGame(game);
    } else {
      navigate(`/auth/login?game=${id}`);
    }
  };

  const handleClick = async (state: any) => {
    const res = await playGame(id!, state);
    if (res.success) {
      socket.emit('play_game', id);
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
      setGame(res.game);
    } else {
      toast({
        variant: 'destructive',
        title: 'Game Error',
        description: res.error,
      });
    }
  };

  const onPlayerJoin = (data: SocketUserData) => {
    toast({
      title: 'Challenge Accepted',
      description: `${data.user.username} has joined this game.`,
    });
    refetch();
  };

  const onPlayerConnect = (data: SocketUserData) => {
    toast({
      title: 'Player connected',
      description: `${data.user.username} has connected to this game.`,
    });
  };

  const onPlayerDisconnect = (data: SocketUserData) => {
    if (
      game?.currentState?.status === 'ongoing' ||
      game?.currentState?.status === 'new'
    ) {
      toast({
        variant: 'destructive',
        title: 'Player disconnected',
        description: `${data.user.username} has disconnected from this game.`,
      });
    }
  };

  const onActivePlayerChange = (data: SocketRoomData) => {
    setActivePlayers(data.map((s) => s.user.id));
  };

  useEffect(() => {
    socket.on('join_room', onPlayerConnect);
    socket.on('join_game', onPlayerJoin);
    socket.on('play_game', refetch);
    socket.on('active_players', onActivePlayerChange);
    socket.on('leave', onPlayerDisconnect);
    init();
    () => {
      socket.off('join_room');
      socket.off('join_game');
      socket.off('play_game');
      socket.off('leave');
    };
  }, [id]);

  useEffect(() => {
    if (game) {
      if (
        game.currentState?.status === 'win' ||
        game.currentState?.status === 'tie'
      ) {
        navigate(`/game/${id}/replay`, { replace: true });
      }
    }
  }, [game]);

  return (
    <>
      <h1 className='text-4xl font-bold leading-none tracking-light text-center pb-4'>
        Game
      </h1>
      {game && (
        <>
          <GameBoard state={game.currentState!.state} onClick={handleClick} />
          <GameInfo game={game} activePlayers={activePlayers} />
        </>
      )}
    </>
  );
};
