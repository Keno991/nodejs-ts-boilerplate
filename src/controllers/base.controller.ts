import { Response } from 'express';

import { HttpStatusCode } from '@enums/http-status.enum';
import { ResponseBuilder } from '@utils/response.util';

export class BaseController {
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
