import type { FC } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import type { GameWithPlayers } from '@/api/game';

type GameInfoProps = {
  game: GameWithPlayers;
};

export const GameInfo: FC<GameInfoProps> = ({ game }) => {
  const currentTurn = game.playerO ? (game.currentState?.turn || 0) + 1 : 0;
  const currentMove =
    game.currentState && game.currentState.turn % 2 ? 'O' : 'X';

  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Game Information</CardTitle>
      </CardHeader>
      <CardContent className='grid md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <p className='text-xl bold text-center md:text-left'>
            Turn {currentTurn}
          </p>
          <div className='flex md:block justify-center'>
            <div className='bg-slate-800 w-[80px] h-[80px] sm:w-[200px] sm:h-[200px] rounded-lg flex items-center justify-center'>
              <p className='text-white text-[70px] sm:text-[175px]'>
                {currentMove}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-xl bold'>Players</p>
          <div className='flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2'>
            <p>
              <b>X: </b>
              <b className='text-indigo-500'>{game.playerX.username}</b>
            </p>
          </div>
          <div className='flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2'>
            <p>
              <b>O: </b>
              {game.playerOId ? (
                <b className='text-indigo-500'>{game.playerO.username}</b>
              ) : (
                'Waiting for opponent...'
              )}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
