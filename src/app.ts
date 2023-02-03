import express, { json, urlencoded, Application } from 'express';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';

import { logger } from '@utils/logger.util';
import { errorHandle } from './middleware/error.middleware';
import morganMiddleware from './middleware/morgan.middleware';
import container from './ioc/ioc-container';

import './controllers/hello-world.controller';
import { env } from './utils/env.util';

export class App {
  private readonly _app: Application;

  constructor() {
    this._app = express();
    this.initializeMiddleware();
  }

  async buildServer() {
    return this.initializeRoutes();
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
    this._app.get('/health', (_, res) => res.json({ message: 'ok' }));
    const server = new InversifyExpressServer(
      container,
      null,
      { rootPath: '/api/v1' },
      this._app
    );
    server.setErrorConfig(app => {
      app.use(errorHandle);
    });
    return server
      .build()
      .listen(env.PORT || 3000, () =>
        logger.info(`Api running on ${env.PORT || 3000}`)
      );
  }
}
