import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';

import weatherRouter from './routes/weather';
import historyRouter from './routes/history';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', weatherRouter);
app.use('/api', historyRouter);

export default app;