import { Model } from './model';

export class Collection<T> extends Array<T> {
  model: any;
  parentAtt: string;
  parentAttValue: string;
  static controler:any;

  constructor(T, private _url:string="") {
    super();
    this.model = T;
  }

  public fetch():void{
    
  }

  public sinc():void{

  }

  public get url():string{
    return this._url;
  }

  public parse(elems: any,ctrl:any): void {
    let self = this;
    elems.forEach((elem) => {
      const modelInstance = new self.model(elem);
      modelInstance.loaded();
      modelInstance.fetch(ctrl)
      this.push(modelInstance);
    });
  }
}
