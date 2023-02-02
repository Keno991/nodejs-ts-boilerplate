import morgan, { StreamOptions } from 'morgan';

import { MorganLogger } from '@utils/logger.util';

const stream: StreamOptions = {
  write: message =>
    MorganLogger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

export default morganMiddleware;
