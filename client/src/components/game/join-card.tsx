import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { GameWithPlayers } from '@/api/game';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { CreateGameButton } from './create-game-button';

type JoinCardProps = {
  games: GameWithPlayers[];
};

export const JoinCard: FC<JoinCardProps> = ({ games }) => {
  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle>Join an available game</CardTitle>
        <CardDescription>
          Games with availability will show up here.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2 grow'>
        {games.length > 0 ? (
          games.map((g) => (
            <div
              key={g.id}
              className='flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2'
            >
              <p>
                Created by{' '}
                <b className='text-indigo-500'>{g.playerX.username}</b>
              </p>
              <Link to={`/game/${g.id}`}>
                <Button>Join</Button>
              </Link>
            </div>
          ))
        ) : (
          <p className='text-center'>
            Looks like there's no available games, why not start a game of your
            own and invite a player to join.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <CreateGameButton />
      </CardFooter>
    </Card>
  );
};
