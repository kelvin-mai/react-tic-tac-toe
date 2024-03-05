import type { FC } from 'react';

import { cn, getBaseUrl } from '@/lib/utils';
import type { GameWithPlayers } from '@/api/game';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  useToast,
} from '@/components/ui';

type GameInfoProps = {
  game: GameWithPlayers;
  activePlayers: string[];
};

type PlayerIndicatorProps = {
  username?: string;
  online: boolean;
  move: 'X' | 'O';
};

const PlayerIndicator: FC<PlayerIndicatorProps> = ({
  username,
  online,
  move,
}) => {
  return (
    <div className='rounded-lg border border-slate-200 bg-white px-4 py-2 flex items-center gap-4'>
      <div className='relative inline-block'>
        <div className='w-16 h-16 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center'>
          <p className='text-white text-4xl text-center'>{move}</p>
        </div>
        <div
          className={cn(
            'w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute bottom-0.5 right-0.5',
            online ? 'bg-green-500' : 'bg-slate-500',
          )}
        />
      </div>
      <p className={cn(username && 'font-bold text-indigo-500')}>
        {username || 'Waiting for opponent...'}
      </p>
    </div>
  );
};

export const GameInfo: FC<GameInfoProps> = ({ game, activePlayers }) => {
  const { toast } = useToast();
  const currentTurn = game.playerO ? (game.currentState?.turn || 0) + 1 : 0;
  const currentMove =
    game.currentState && game.currentState.turn % 2 ? 'O' : 'X';

  const gameToClipboard = () => {
    navigator.clipboard.writeText(`${getBaseUrl()}/game/${game.id}`);
    toast({
      title: 'Copy to Clipboard Success',
      description: `Successfully copied to clipboard. Please send this to someone you would like to challenge.`,
    });
  };

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
          <PlayerIndicator
            username={game.playerX.username}
            online={activePlayers.includes(game.playerXId)}
            move='X'
          />
          <PlayerIndicator
            username={game.playerO?.username}
            online={
              game.playerOId ? activePlayers.includes(game.playerOId) : false
            }
            move='O'
          />
          {!game.playerOId && (
            <Button onClick={gameToClipboard}>Copy game to clipboard</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
