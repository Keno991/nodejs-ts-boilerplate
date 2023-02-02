import { HttpStatusCode } from '@enums/http-status.enum';
import { HelloWorldService } from '@service/hello-world.service';
import { RequestHandler } from 'express';
import { BaseController } from './base.controller';

export class HelloWorldController extends BaseController {
  constructor(private readonly helloWorldService: HelloWorldService) {
    super();
  }

  greetWorld: RequestHandler = (req, res) => {
    return this.promiseResponse(
      res,
      HttpStatusCode.OK,
      this.helloWorldService.greetWorld(req.params.greeting)
    );
  };
}
