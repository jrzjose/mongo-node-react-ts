import express, { Request, Response, Application } from 'express';
import helmet from 'helmet';
import pino from 'pino';
import { initdb } from "./initdb";
// import cors from 'cors';
// import pinoHttp from 'pino-http';
import api from "./api";


const app: Application = express();
const logger = pino({ transport: { target: 'pino-pretty' } });

// app.use(pinoHttp({ logger }));
app.use(helmet());
// app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

const PORT = process.env.PORT || 8089;

initdb();
app.use("", api);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});