import { Application } from 'express';

import { V1Routes } from './v1/index.route';

export function apiRoutes(app: Application) {
  app.use('/api', new V1Routes().routes);
}
