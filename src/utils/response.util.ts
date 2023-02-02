import { Response } from 'express';

type ResponseObject<T> = { result?: T };

export class ResponseBuilder<T> {
  private readonly responseObject: ResponseObject<T>;

  constructor(private readonly response: Response) {
    this.responseObject = {};
  }

  setData(data: T) {
    this.responseObject.result = data;

    return this;
  }

  setResponseStatus(status: number) {
    this.response.status(status);

    return this;
  }

  build() {
    return this.response.json(this.responseObject);
  }
}
