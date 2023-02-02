import { HttpStatusCode } from '@enums/http-status.enum';
import { Dictionary } from '@interfaces/common.interface';
import { HttpException } from './http.exception';

export class Forbidden extends HttpException {
  constructor(data?: Dictionary) {
    super(HttpException.createBody(data), HttpStatusCode.FORBIDDEN);
  }
}
