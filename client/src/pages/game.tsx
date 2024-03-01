import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { GameBoard } from '@/components/game';
import { getGame, playGame } from '@/api/game';

export const Component = () => {
  const { id } = useParams();
  const [gameState, setGameState] = useState<
    (ReadonlyArray<string | undefined> & { length: 9 }) | undefined
  >();
  const init = async () => {
    const { game } = await getGame(id!);
    setGameState(game.currentState.state);
  };

  const handleClick = async (state: any) => {
    const { game } = await playGame(id!, state);
    setGameState(game.currentState.state);
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <main className='container'>
      <h1 className='text-center my-2'>Tic Tac Toe</h1>
      {gameState && <GameBoard gameState={gameState} onClick={handleClick} />}
    </main>
  );
};
