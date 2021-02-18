
export class ObjectHelper {

  static printNamesAndValues<T>(obj: T) {
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(
      propName => {
        console.log(
          'name: ' + propName
          + ' value: ' + obj[propName]);
      }
    );
  }

  static printTypeNames<T>(obj: T) {
    const objectKeys = Object.keys(obj) as (keyof T)[];
    for (const key of objectKeys) {
      console.log('key:' + key);
    }
  }

  static describeClass(typeOfClass: any): any {
    const a = new typeOfClass();
    return Object.getOwnPropertyNames(a);
  }

  static describe(instance: any): any {
    return Object.getOwnPropertyNames(instance);
  }

  static enumToArray(e: any): any[] {
    return Object.keys(e)
      .map(key => ({ id: e[key], name: key }));
  }

  static getNamesAndValues<T extends number>(e: any) {
    return ObjectHelper.getNames(e).map(n => ({ name: n, value: e[n] as T }));
  }

  static getNames(e: any) {
    return ObjectHelper.getObjValues(e).filter(v => typeof v === 'string') as string[];
  }

  static getValues<T extends number>(e: any) {
    return ObjectHelper.getObjValues(e).filter(v => typeof v === 'number') as T[];
  }

  static getSelectList<T extends number, U>(e: any, stringConverter: (arg: U) => string) {
    const selectList = new Map<T, string>();
    // tslint:disable-next-line:no-static-this
    this.getValues(e).forEach(val => selectList.set(val as T, stringConverter(val as unknown as U)));
    return selectList;
  }

  static getSelectListAsArray<T extends number, U>(e: any, stringConverter: (arg: U) => string) {
    // tslint:disable-next-line:no-static-this
    return Array.from(this.getSelectList(e, stringConverter), value => ({ value: value[0] as T, presentation: value[1] }));
  }

  private static getObjValues(e: any): (number | string)[] {
    return Object.keys(e).map(k => e[k]);
  }
}
