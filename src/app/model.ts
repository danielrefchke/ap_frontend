

export class Model  {
  prev: {};
  attr: {};
  idAttr: string;
  isNew:boolean;

  constructor(attr: {}, idAttr: string = 'id') {
    this.attr = attr;
    this.prev = {};
    this.idAttr = idAttr;
    this.isNew=true;
  }

  loaded():void{
    this.isNew= false;
  }

  toJson():string{
    return JSON.stringify(this.attr);
  }

  isChanged(): boolean {
    return Object.keys(this.prev).length > 0;
  }

  revert() {
    for (const field in this.prev) {
      this.attr[field] = this.prev[field];
    }
    this.prev = {};
  }

  confirm() {
    this.prev = {};
  }

  setValue(field: string, value: any) {
    //console.log(field);
    this.change(field);
    this.attr[field] = value;
    //console.log(this.attr[field]);
  }

  getValue(field: string) {
    return this.attr[field];
  }

  change(field: string) {
    this.prev[field] = this.attr[field];
    console.log(this.prev[field]);
  }

  fetch(ctrl:any):void{

  }
}
