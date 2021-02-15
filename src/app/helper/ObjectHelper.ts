
export class ObjectHelper {

  static printNamesAndValues<T>(obj: T) {
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(
      function(propName) {
        console.log(
          'name: ' + propName
          + ' value: ' + obj[propName]);
      }
    );
  }

  static printTypeNames<T>(obj: T) {
    const objectKeys = Object.keys(obj) as Array<keyof T>;
    for (const key of objectKeys) {
      console.log('key:' + key);
    }
  }

  static  describeClass( typeOfClass: any) {
    const a = new typeOfClass();
    const array = Object.getOwnPropertyNames(a);
    return array;
  }

  static describe(instance): Array<string> {
    return Object.getOwnPropertyNames(instance);
  }

  // tslint:disable-next-line:ban-types
  static enumToArray(e: any): Object[] {
    return Object.keys(e)
              .map(key => ({ id: e[key], name: key }))
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
      this.getValues(e).forEach(val => selectList.set(val as T, stringConverter(val as unknown as U)));
      return selectList;
  }

  static getSelectListAsArray<T extends number, U>(e: any, stringConverter: (arg: U) => string) {
      return Array.from(this.getSelectList(e, stringConverter), value => ({ value: value[0] as T, presentation: value[1] }));
  }

  private static getObjValues(e: any): (number | string)[] {
      return Object.keys(e).map(k => e[k]);
  }
}
