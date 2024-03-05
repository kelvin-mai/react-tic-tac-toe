import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import type { ServerPagination } from '@/api/types';
import type { GameState, GameWithPlayers } from '@/api/game';
import { type Player, getPlayer } from '@/api/player';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Pagination } from '@/components/common';

export const Component = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [games, setGames] = useState<GameWithPlayers[]>([]);
  const [pagination, setPagination] = useState<ServerPagination>({
    page: 0,
    pageSize: 0,
    total: 0,
  });
  const page = parseInt(searchParams.get('page') || '1');
  if (!id) {
    return navigate('/');
  }
  const init = async () => {
    const { player, games, pagination } = await getPlayer(id, page);
    setPlayer(player);
    setGames(games);
    setPagination(pagination);
  };
  useEffect(() => {
    init();
  }, [id, page]);

  const playerGameStatus = (game?: GameState) => {
    if (game) {
      if (game.status === 'win') {
        if (player?.id === game.winnerId) {
          return 'win';
        } else {
          return 'lose';
        }
      } else {
        return game.status;
      }
    }
  };

  return (
    <main className='container pt-8'>
      <Card>
        <CardHeader>
          <CardTitle>
            <span className='text-indigo-500'>
              {player?.username || 'User'}{' '}
            </span>
            Profile
          </CardTitle>
          <CardDescription>
            This is a list of completed games played by this player.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          {games.length ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-center'>Date</TableHead>
                    <TableHead className='text-center'>Player X</TableHead>
                    <TableHead className='text-center'>Player Y</TableHead>
                    <TableHead className='text-center'>Turns</TableHead>
                    <TableHead className='text-center'>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {games.map((g) => (
                    <TableRow
                      key={g.id}
                      className='cursor-pointer'
                      onClick={() => navigate(`/game/${g.id}/replay`)}
                    >
                      <TableCell className='text-center'>
                        {g.createdAt}
                      </TableCell>
                      <TableCell className='text-center'>
                        {g.playerX.username}
                      </TableCell>
                      <TableCell className='text-center'>
                        {g.playerO?.username}
                      </TableCell>
                      <TableCell className='text-center'>
                        {g.currentState?.turn}
                      </TableCell>
                      <TableCell className='text-center capitalize'>
                        {playerGameStatus(g.currentState)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                {...pagination}
                onPageChange={(i) => navigate(`/player/${id}?page=${i}`)}
              />
            </>
          ) : (
            <p className='text-center text-lg'>
              This player has not played any games yet.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
