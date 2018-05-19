import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { serverPort } from './config/config.json';
import * as db from './utils/DataBaseUtils';
import apiRoutes from './api/index';

const PORT = process.env.PORT || serverPort;

const app = express();

db.setUpConnection();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false
}));

app.use(passport.initialize());

app.use('/api', apiRoutes(express));

app.get('/', (req, res) => res.send(`Hello! The API is at http://localhost:${PORT}/api`));

const server = app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
