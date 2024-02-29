import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}
`),
);
