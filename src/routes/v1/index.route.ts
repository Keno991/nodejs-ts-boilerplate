import { Router } from 'express';

import { HelloWorldRoutes } from './hello-world/index.route';

export class V1Routes {
  private readonly router: Router = Router();

  get routes(): Router {
    this.router.use('/v1', [new HelloWorldRoutes().routes]);

    return this.router;
  }
}
