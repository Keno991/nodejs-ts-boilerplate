import { instance } from './util';

jest.setTimeout(15000);

beforeAll(async () => {
  await instance.start();
});

afterAll(async () => {
  await instance.close();
});
