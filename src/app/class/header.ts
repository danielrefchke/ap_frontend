import { Model } from "./model";

export class Header extends Model {
  constructor(attr: {}, idAttr: string = 'id') {
    super(attr, idAttr);
  }

  public get id(): number {
    return this.getValue("id");
  }

  public set id(value: number) {
    this.setValue("id" , value);
  }

  public get nombre(): string {
    return this.getValue("nombre");
  }

  public set nombre(value: string) {
    this.setValue("nombre" , value);
  }

  public get titulo(): string {
    return this.getValue("titulo");
  }

  public set titulo(value: string) {
    this.setValue("titulo" , value);
  }

  public get descripcion(): string {
    return this.getValue("descripcion");
  }

  public set descripcion(value: string) {
    this.setValue("descripcion" , value);
  }

  public get imgback(): string {
    return this.getValue("imgback");
  }

  public set imgback(value: string) {
    this.setValue("imgback", value);
  }

  public get imgpersona(): string {
    return this.getValue("imgpersona");
  }

  public set imgpersona(value: string) {
    this.setValue("imgpersona" , value);
  }

  public get imgcred(): string {
    return this.getValue("imgcred");
  }

  public set imgcred(value: string) {
    this.setValue("imgcred" , value);
  }
}

/*
export class Header {
    constructor(
        public id:number,
        public nombre:string,
        public titulo:string,
        public descripcion:string,
        public imgback:string,
        public imgpersona:string,
        public imgcred:string
    ) { }

}
*/
