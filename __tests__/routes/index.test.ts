import { request } from '../__mocks__';

describe('testing hello world routes', () => {
  it('should get hello world response', async () => {
    const rsp = await request.get({ url: '/hello-world/aloha/world' });
    expect(rsp.body.result).toEqual('aloha World');
  });
});
