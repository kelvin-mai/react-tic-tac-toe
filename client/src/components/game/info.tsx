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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Information</CardTitle>
      </CardHeader>
      <CardContent>
        <pre>
          {JSON.stringify({
            x: game.playerXId,
            y: game.playerOId,
            turn: game.currentState?.turn,
          })}
        </pre>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
