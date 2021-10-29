import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import createDatabaseConnection from 'database/createConnection';
import { addRespondToResponse } from 'middleware/response';
import { authenticateUser } from 'middleware/authentication';
import { handleError } from 'middleware/errors';

import { attachPublicRoutes, attachPrivateRoutes } from './routes';

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use('/', express.static('www'));

  app.use(addRespondToResponse);

  attachPublicRoutes(app);

  app.use('/api/v1/', authenticateUser);

  attachPrivateRoutes(app);

  app.use((_req, res, _next) => res.redirect('/'));
  app.use(handleError);

  app.listen(process.env.PORT || 3000);
  console.log('process.env.PORT:', process.env.PORT);
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
