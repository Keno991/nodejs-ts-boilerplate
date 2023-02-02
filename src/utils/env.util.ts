import 'dotenv/config';

interface DB {
  port: number;
  host: string;
  username: string;
  password: string;
  name: string;
}

interface Configuration {
  IS_PRODUCTION: boolean;
  USE_DB: boolean;
  NODE_ENV?: string;
  PORT: number;
  SERVER_URL?: string;
  db: Readonly<DB>;
}

const {
  NODE_ENV,
  SERVER_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  SERVER_URL,
  USE_DB,
} = process.env;

export const env: Readonly<Configuration> = {
  IS_PRODUCTION: NODE_ENV === 'production',
  USE_DB: USE_DB === 'true' ?? false,
  NODE_ENV,
  PORT: Number(SERVER_PORT),
  SERVER_URL,
  db: {
    name: POSTGRES_DATABASE,
    password: POSTGRES_PASSWORD,
    username: POSTGRES_USER,
    port: parseInt(POSTGRES_PORT!, 10),
    host: POSTGRES_HOST ?? 'pg',
  } as DB,
};
