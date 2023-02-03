/* eslint-disable @typescript-eslint/no-namespace */
import 'reflect-metadata';
import 'dotenv/config';

import { App } from './app';
import { logger } from './utils/logger.util';
import { setupDb } from './database';
import { env } from './utils/env.util';

const main = async () => {
  const app = new App();

  try {
    if (env.USE_DB) await setupDb();
    const server = await app.buildServer();

    process.on('SIGTERM', () => {
      logger.debug('SIGTERM signal received: closing HTTP server');
      server.close(() => logger.debug('HTTP server closed'));
    });
  } catch (error) {
    logger.error('🚀 ~ file: server.ts ~ line 19 ~ main ~ error', error);
  }
};

main();
