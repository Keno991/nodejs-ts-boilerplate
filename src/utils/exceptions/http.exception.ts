import { HttpStatusCode } from '@enums/http-status.enum';
import { Dictionary } from '@interfaces/common.interface';

type ErrorResponse = Dictionary & {
  meta: Dictionary;
};

export class HttpException extends Error {
  constructor(
    private readonly response: ErrorResponse,
    private readonly status: HttpStatusCode
  ) {
    super();
    this.initMessage();
    this.initName();
  }

  private initMessage() {
    const match = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g);
    this.message = match!.join(' ');
  }

  private initName() {
    this.name = this.constructor.name;
  }

  public getResponse() {
    return { message: this.message, status: this.status, ...this.response };
  }

  public static createBody(meta?: Dictionary): ErrorResponse {
    return { meta: meta || {} };
  }
}
