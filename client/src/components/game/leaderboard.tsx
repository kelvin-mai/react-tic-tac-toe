import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { Player } from '@/api/player';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

type LeaderboardProps = {
  players: Player[];
};

export const Leaderboard: FC<LeaderboardProps> = ({ players }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>This is a list of the top 5 players.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Do you have what it takes to make it to the top of the leaderboard?
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Rank</TableHead>
              <TableHead className='text-center'>User</TableHead>
              <TableHead className='text-center'>Games Won</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((p, i) => (
              <TableRow key={p.id}>
                <TableCell className='text-center'>{i + 1}</TableCell>
                <TableCell className='text-center text-indigo-500 font-bold'>
                  <Link to={`/player/${p.id}`}>{p.username}</Link>
                </TableCell>
                <TableCell className='text-center'>
                  {p._count.gamesWon}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
