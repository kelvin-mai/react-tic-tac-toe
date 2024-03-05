import { type FC, useState } from 'react';

import type { GameWithPlayers } from '@/api/game';
import { GameBoard } from '@/components/game';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

type ReplayBoardProps = {
  game: GameWithPlayers;
};

export const ReplayBoard: FC<ReplayBoardProps> = ({ game }) => {
  const [step, setStep] = useState(
    game.gameStates ? game.gameStates.length - 1 : 0,
  );

  const increment = () => {
    if (step < (game.gameStates ? game.gameStates.length - 1 : 0)) {
      setStep(step + 1);
    }
  };

  const decrement = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const winner =
    game.currentState?.winnerId === game.playerX?.username
      ? game.playerX.username
      : game.playerO?.username;
  const winnerText = `${winner} won this Game`;

  return (
    <>
      <GameBoard state={game.gameStates![step].state} />
      <div className='flex items-center justify-center'>
        <Card className='mt-4 max-w-[700px]'>
          <CardHeader>
            <CardTitle>
              {game.currentState?.status === 'tie' ? 'Tie Game' : winnerText}
            </CardTitle>
            <CardDescription>
              This game is finished in {game.currentState?.turn} turns and
              resulted in a {game.currentState?.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This game may be over, but you can watch each step and see how it
              went by using the replay functionality!
            </p>
          </CardContent>
          <CardFooter className='flex gap-2 items-center'>
            <Button onClick={decrement}>Previous Step</Button>
            <Button onClick={increment}>Next Step</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
