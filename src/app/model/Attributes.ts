
export class Attributes<T> {
  constructor(private data: T) {}
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set = (update: T): void => {
    //   this is like spread operator. it will take this.data obj and will overwrite with the update obj
    // ins tsconfig.json change target to Es6 to be able to use Object.assign()
    Object.assign(this.data, update);
  };
  getAll(): T {
    return this.data;
  }
}