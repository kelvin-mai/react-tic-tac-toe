import { PrismaClient } from '@prisma/client';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { webcrypto } from 'crypto';
globalThis.crypto = webcrypto;

const prisma = new PrismaClient();

async function main() {
  const password = await new Argon2id().hash('password');
  const player1 = await prisma.user.create({
    data: {
      id: generateId(14),
      username: 'player1',
      password,
    },
  });
  const player2 = await prisma.user.create({
    data: {
      id: generateId(14),
      username: 'player2',
      password,
    },
  });
  console.log('players created: ', [player1, player2]);
  const newGame = await prisma.game.create({
    data: {
      id: generateId(14),
      playerXId: player1.id,
      playerOId: player2.id,
      gameStates: {
        create: [{ turn: 0, state: Array(9).fill(null), status: 'new' }],
      },
    },
  });
  console.log('games created: ', [newGame]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
