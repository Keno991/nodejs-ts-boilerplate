import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify/lib/annotation/inject';

import { HttpStatusCode } from '@enums/http-status.enum';
import { HelloWorldService } from '@service/hello-world.service';
import { validator } from '@middleware/validator.middleware';
import { GreetWorldDto } from '@dto/greet-world.dto';
import TYPES from '../ioc/types';
import { BaseController } from './base.controller';

@controller('/hello-world')
export class HelloWorldController extends BaseController {
  constructor(
    @inject(TYPES.HelloWorldSvc)
    private readonly helloWorldService: HelloWorldService
  ) {
    super();
  }

  @httpGet('/:greeting/world', validator(GreetWorldDto, 'params'))
  public greetWorld(@request() req: Request, @response() res: Response) {
    return this.promiseResponse(
      res,
      HttpStatusCode.OK,
      this.helloWorldService.greetWorld(req.params.greeting)
    );
  }
}
