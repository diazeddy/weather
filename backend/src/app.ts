import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import urlRoutes from './routes/urlRoutes';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', urlRoutes);

export default app;
