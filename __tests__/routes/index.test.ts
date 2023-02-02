import { HttpStatusCode } from '@enums/http-status.enum';
import { request } from '../__mocks__';

describe('testing hello world routes', () => {
  it('should get hello world response', async () => {
    const rsp = await request.get({ url: '/hello/world' });
    expect(rsp.body.result).toEqual('hello World');
  });

  it('should catch not found error', async () => {
    const rsp = await request.get({ url: '/hello/error' });
    expect(rsp.status).toEqual(HttpStatusCode.NOT_FOUND);
  });

  it('should catch unhandled error', async () => {
    const rsp = await request.get({ url: '/hello/error/unhandled' });
    expect(rsp.status).toEqual(HttpStatusCode.INTERNAL_SERVER_ERROR);
  });

  it('should catch bad request error', async () => {
    const rsp = await request.get({ url: '/hello/error/bad' });
    expect(rsp.status).toEqual(HttpStatusCode.BAD_REQUEST);
  });

  it('should catch forbidden error', async () => {
    const rsp = await request.get({ url: '/hello/error/forbidden' });
    expect(rsp.status).toEqual(HttpStatusCode.FORBIDDEN);
  });

  it('should catch unauthorized error', async () => {
    const rsp = await request.get({ url: '/hello/error/unauthorized' });
    expect(rsp.status).toEqual(HttpStatusCode.UNAUTHORIZED);
  });

  it('should succeed', async () => {
    const rsp = await request.post({ url: '/hello' }).send({ name: '' });
    expect(rsp.status).toEqual(HttpStatusCode.CREATED);
  });

  it('should catch post error', async () => {
    const rsp = await request.post({ url: '/hello' }).send({ name: 123 });
    expect(rsp.body.message).toEqual('Bad Request');
    expect(rsp.body.errors.name).toEqual('name must be a string');
  });
});
