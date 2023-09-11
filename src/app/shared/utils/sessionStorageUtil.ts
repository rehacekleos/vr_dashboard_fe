export class SessionStorageUtil{


  public static saveValue(key: string, value: any){
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static getValue(key: string): any{
    const val = sessionStorage.getItem(key)
    return JSON.parse(val);
  }

  public static deleteValue(key: string){
    sessionStorage.removeItem(key);
  }

}
