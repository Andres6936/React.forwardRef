export class DummyService {
  public static async writeMessage(message: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message);
      }, 200);
    });
  }
}
