import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { middleware as authMiddleware } from './lib/auth';
import { router } from './routes';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(authMiddleware);

app.use('/api', router);

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}
`),
);
