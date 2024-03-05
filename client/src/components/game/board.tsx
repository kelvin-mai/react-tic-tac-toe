import type { FC } from 'react';

import type { BoardState } from '@/api/game';

type GameBoardProps = {
  state: BoardState;
  onClick?: (state: any) => void | Promise<void>;
};

export const GameBoard: FC<GameBoardProps> = ({ state, onClick }) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='grid grid-cols-3 gap-2'>
        {state.map((v, i) => (
          <div
            key={i}
            className='bg-slate-800 w-[80px] h-[80px] sm:w-[200px] sm:h-[200px] rounded-lg flex items-center justify-center cursor-pointer'
            onClick={() => (onClick ? onClick(i) : {})}
          >
            <p className='text-white text-[70px] sm:text-[175px]'>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
