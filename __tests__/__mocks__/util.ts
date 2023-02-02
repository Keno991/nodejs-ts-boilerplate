import { Server } from 'http';
import supertest, { Test } from 'supertest';
import { DataSource } from 'typeorm';
import { newDb } from 'pg-mem';

import { App } from '../../src/app';

const db = newDb();

class HttpRequest {
  private static instance: HttpRequest;

  public static getInstance(): HttpRequest {
    if (!HttpRequest.instance) {
      HttpRequest.instance = new HttpRequest();
    }

    return HttpRequest.instance;
  }

  private readonly app: App;

  private server?: Server;

  private requestWithSupertest?: supertest.SuperAgentTest;

  private masterConnection?: DataSource;

  private constructor() {
    this.app = new App();
  }

  async start() {
    this.masterConnection = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      database: 'test',
      entities: ['src/database/entities/**/*.ts'],
      migrations: ['src/database/migrations/**/*.ts'],
      subscribers: ['src/database/subscriber/**/*.ts'],
      synchronize: true,
    });
    await this.masterConnection?.initialize();
    this.server = await this.app.listen();
    this.requestWithSupertest = supertest.agent(this.server);
  }

  async close() {
    this.server?.close();
    this.server = undefined;
    this.requestWithSupertest = undefined;
    await this.masterConnection?.destroy();
  }

  getRequest() {
    return {
      post: this.hook('post'),
      get: this.hook('get'),
      put: this.hook('put'),
      patch: this.hook('patch'),
      delete: this.hook('delete'),
    };
  }

  private hook(method: 'post' | 'get' | 'put' | 'patch' | 'delete') {
    return (args: { url: string; token?: string }) => {
      const req = this.requestWithSupertest?.[method](
        `/api/v1${args.url}`
      ) as Test;

      if (args.token) {
        req.set('Authorization', `Bearer ${args.token}`);
      }

      return req;
    };
  }
}

export const instance = HttpRequest.getInstance();
