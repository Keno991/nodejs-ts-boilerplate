export class HelloWorldService {
  greetWorld = async (greeting: string) => {
    return `${greeting} World`;
  };
}
