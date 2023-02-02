import { IsString } from 'class-validator';
import { Router } from 'express';

import { HttpStatusCode } from '@enums/http-status.enum';
import { BadRequest, Forbidden, NotFound, Unauthorized } from '@exceptions';
import { validator } from '@middleware/validator.middleware';
import { ResponseBuilder } from '@utils/response.util';
import { promiseHandler } from '@middleware/promiseHandler.middleware';
import { HelloWorldController } from '@controller/hello-world.controller';
import { HelloWorldService } from '@service/hello-world.service';
import { GreetWorldDto } from '@dto/greet-world.dto';

class PostDto {
  @IsString()
  name!: string;
}

export class HelloWorldRoutes {
  private readonly router: Router = Router();

  private readonly helloWorldCtrl = new HelloWorldController(
    new HelloWorldService()
  );

  get routes(): Router {
    this.router.get(
      '/:greeting/world',
      validator(GreetWorldDto, 'params'),
      promiseHandler(this.helloWorldCtrl.greetWorld)
    );

    this.router.get('/hello/error', () => {
      throw new NotFound();
    });

    this.router.get('/hello/error/unhandled', () => {
      throw new Error();
    });

    this.router.get('/hello/error/bad', () => {
      throw new BadRequest();
    });

    this.router.get('/hello/error/forbidden', () => {
      throw new Forbidden();
    });

    this.router.get('/hello/error/unauthorized', () => {
      throw new Unauthorized();
    });

    this.router.post('/hello', validator(PostDto, 'body'), (_, res) => {
      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.CREATED)
        .setData({ message: 'Hello World' })
        .build();
    });

    return this.router;
  }
}
