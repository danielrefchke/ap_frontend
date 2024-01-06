import { Model } from "./model";

export class Socialmedia extends Model {
  
  constructor(attr: {}, idAttr: string="id") {
    super(attr, idAttr);
  }

  public get url(): string {
    return this.getValue("url");
  }

  public set url(value: string) {
    this.setValue("url",value);
  }

  public get id(): number {
    return this.getValue('id');
  }

  public set id(value: number) {
    this.setValue('id', value);
  }

  public get icon(): string {
    return this.getValue('icon');
  }

  public set icon(icon: string) {
    this.setValue('icon', icon);
  }

}

/*
export class Socialmedia {
    constructor(
        public id:number,
        public icon:string,
        public url:string
    ){}

*/