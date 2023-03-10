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

  public undoAll():void{
    this.forEach((elemento:any)=>{
      elemento.revert();
    })
  }

  public parse(elems: any,ctrl:any=null): void {
    if(this.length > 0){
      this.splice(0,this.length);
    }
    let self = this;
    elems.forEach((elem) => {
      const modelInstance = new self.model(elem);
      modelInstance.loaded();
      modelInstance.fetch(ctrl)
      this.push(modelInstance);
    });
  }
}
