import { useNavigate } from 'react-router';

import { createGame } from '@/api/game';
import { Button, useToast } from '@/components/ui';

export const CreateGameButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleClick = async () => {
    const { success, game } = await createGame();
    if (success) {
      navigate(`/game/${game.id}`);
    } else {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };
  return (
    <Button onClick={handleClick} className='w-full'>
      Create a new game
    </Button>
  );
};
