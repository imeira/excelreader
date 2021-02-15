
export class Proxy {
  constructor(kwArgs: {}) {
    for (const key in kwArgs) {
      this[key] = kwArgs[key];
    }
  }

  get(key: string): any {
    return this[key];
  }

  set(key: {}): void;
  set(key: string, value: any): void;
  set(key: any, value?: any): void {
    // ...
  }
}
