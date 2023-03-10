import { Model } from "./model";

export class User extends Model {
  constructor(attr: {}, idAttr: string = '') {
    super(attr);
    /* id: number,
     nombre: string,
     token: string*/
  }

  public get id(): number {
    return this.getValue('id');
  }

  public set id(value: number) {
    this.setValue('id', value);
  }

  public get nombre(): string {
    return this.getValue('nombre');
  }

  public set nombre(value: string) {
    this.setValue('nombre', value);
  }

  public get token(): string {
    return this.getValue('token');
  }

  public set token(value: string) {
    this.setValue('token', value);
  }

  public get password(): string {
    return this.getValue('password');
  }

  public set password(value: string) {
    this.setValue('password', value);
  }
}
