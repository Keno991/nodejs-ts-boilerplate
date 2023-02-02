process.env.SERVER_PORT = '5000';
process.env.TOKEN_EXP_TIME = '15min';
process.env.TOKEN_EXP_REFRESH_TIME = '7d';
process.env.TOKEN_SECRET_KEY = 'secret';
process.env.TOKEN_REFRESH_SECRET_KEY = 'refresh-secret';
process.env.TOKEN_REFRESH_PATH = '/api/v1/auth/refresh';
process.env.TOKEN_REFRESH_NAME = 'refresh-token';

process.env.NODE_ENV = 'test';
