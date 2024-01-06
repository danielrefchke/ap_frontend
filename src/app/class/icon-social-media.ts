import { Model } from "./model";

export class IconSocialMedia extends Model {
  
  constructor(attr: {}, idAttr: string = 'id') {
    super(attr, idAttr);
  }

  public get id():number{
    return this.getValue("id");
  }
  
  public get nombre(): string {
    return this.getValue('nombre');
  }

  public set nombre(value: string) {
    this.setValue('nombre', value);
  }

  public get cssclass(): string {
    return this.getValue('cssclas');
  }

  public set cssclass(value: string) {
    this.setValue('cssclas', value);
  }
}
