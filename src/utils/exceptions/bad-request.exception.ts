import { HttpStatusCode } from '@enums/http-status.enum';
import { Dictionary } from '@interfaces/common.interface';
import { HttpException } from './http.exception';

export class BadRequest extends HttpException {
  constructor(data?: Dictionary) {
    super(HttpException.createBody(data), HttpStatusCode.BAD_REQUEST);
  }
}
