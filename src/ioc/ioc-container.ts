import { Container } from 'inversify';
import { HelloWorldService } from '@service/hello-world.service';
import TYPES from './types';

const container = new Container();

container
  .bind<HelloWorldService>(TYPES.HelloWorldSvc)
  .to(HelloWorldService)
  .inRequestScope();
export default container;
