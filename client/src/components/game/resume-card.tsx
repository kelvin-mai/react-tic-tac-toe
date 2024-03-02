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

type ResumeCardProps = {
  games: GameWithPlayers[];
};

export const ResumeCard: FC<ResumeCardProps> = ({ games }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume a game</CardTitle>
        <CardDescription>
          Games that you haven't finished will show up here.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        {games.map((g) => (
          <div
            key={g.id}
            className='flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2'
          >
            {g.playerO ? (
              <>
                <p>
                  <b className='text-indigo-500'>{g.playerX.username}</b> vs{' '}
                  <b className='text-indigo-500'>{g.playerO?.username}</b>
                </p>
              </>
            ) : (
              <p>Waiting for another player...</p>
            )}
            <Link to={`/game/${g.id}`}>
              <Button>Resume</Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
