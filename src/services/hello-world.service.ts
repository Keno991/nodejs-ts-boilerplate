import { injectable } from 'inversify';

@injectable()
export class HelloWorldService {
  greetWorld = async (greeting: string) => {
    return `${greeting} World`;
  };
}
