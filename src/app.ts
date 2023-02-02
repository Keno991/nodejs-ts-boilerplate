import express, { json, urlencoded, Application } from 'express';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { errorHandle } from './middleware/error.middleware';
import morganMiddleware from './middleware/morgan.middleware';
import { apiRoutes } from './routes';
import { logger } from './utils/logger.util';
import { env } from './utils/env.util';

export class App {
  private readonly _app: Application;

  private readonly port = env.PORT;

  constructor() {
    this._app = express();
    this.initializeMiddleware();
  }

  async listen() {
    this.initializeRoutes();

    return this._app.listen(this.port, () =>
      logger.info(`API listening on port ${this.port}!`)
    );
  }

  private initializeMiddleware() {
    this._app.use([
      json({ limit: '256mb' }),
      urlencoded({ extended: true, limit: '256mb' }),
      cookieParser(),
      helmet(),
      hpp(),
      cors({ credentials: true }),
      morganMiddleware,
    ]);
  }

  private initializeRoutes() {
    apiRoutes(this._app);
    this._app.get('/health', (_, res) => res.json({ message: 'ok' }));
    this._app.use(errorHandle);
  }
}
