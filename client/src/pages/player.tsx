import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { GameState, GameWithPlayers } from '@/api/game';
import { Player, getPlayer } from '@/api/player';
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

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [games, setGames] = useState<GameWithPlayers[]>([]);
  if (!id) {
    return navigate('/');
  }
  const init = async () => {
    const { player, games } = await getPlayer(id);
    setPlayer(player);
    setGames(games);
  };
  useEffect(() => {
    init();
  }, [id]);
  console.log({ player, games });

  const playerGameStatus = (game?: GameState) => {
    if (game) {
      if (game.status === 'win') {
        if (player?.id === game.winner_id) {
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
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-indigo-500'>{player?.username || 'User'} </span>
          Profile
        </CardTitle>
        <CardDescription>
          This is a list of completed games played by this player.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
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
      </CardContent>
    </Card>
  );
};
