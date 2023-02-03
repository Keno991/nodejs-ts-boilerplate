import { Response } from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';

import { HttpStatusCode } from '@enums/http-status.enum';
import { ResponseBuilder } from '@utils/response.util';

@injectable()
export class BaseController implements interfaces.Controller {
  protected response<T>(res: Response, status: HttpStatusCode, data?: T) {
    return new ResponseBuilder(res)
      .setResponseStatus(status)
      .setData(data)
      .build();
  }

  protected async promiseResponse<T>(
    res: Response,
    status: HttpStatusCode,
    promise: Promise<T>
  ) {
    const data = await promise;
    return this.response(res, status, data);
  }
}
