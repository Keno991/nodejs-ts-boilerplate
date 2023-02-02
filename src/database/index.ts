import { DataSource, DataSourceOptions } from 'typeorm';

import { env } from '../utils/env.util';
import { logger } from '../utils/logger.util';

const { db, IS_PRODUCTION } = env;

const dbOptions = (database = db.name): DataSourceOptions => ({
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database,
  logging: IS_PRODUCTION ? ['error'] : ['error', 'warn', 'query'],
  entities: [`${__dirname}/entities/*.entity.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.{js,ts}`, './migrations/*.{js,ts}'],
  schema: 'api',
});

// eslint-disable-next-line import/no-mutable-exports
export let dataSource = new DataSource(dbOptions());

export const setupDb = async () => {
  try {
    await dataSource?.initialize();
    await dataSource.query('CREATE SCHEMA IF NOT EXISTS api');
  } catch (error) {
    logger.error(
      '🚀 ~ file: index.ts ~ line 43 ~ setupDb ~ error',
      error.message
    );
  }
};

export const getDataSource = () => dataSource;
export const setDataSource = (source: DataSource) => {
  dataSource = source;
};

export const getQueryRunner = () => dataSource!.createQueryRunner();
