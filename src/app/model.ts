import { retry } from "rxjs";


export class Model {
  prev: {};
  attr: {};
  idAttr: string;
  private _isNew: boolean;
  private _isDeleted:boolean;

  constructor(attr: {}, idAttr: string = "id") {
    this.attr = attr;
    this.prev = {};
    this.idAttr = idAttr;
    this._isNew = true;
  }

  loaded(): void {
    this._isNew = false;
    this.prev = {};
  }

  get isDeleted():boolean{
    return this._isDeleted;
  }

  delete(){
    this._isDeleted=true;
  }

  unDelete(){
    this._isDeleted = false;
  }

  serialize(): {} {
    return this.attr;
  }

  unserialize(attr: {}):void{
    this.attr = attr;
    this.loaded();
  };

  toJson(): string {
    return JSON.stringify(this.attr);
  }

  public get isChanged(): boolean {
    //console.log((Object.keys(this.prev).length > 0));
    
    return Object.keys(this.prev).length > 0;
  }

  public get isNew():boolean{
    return this._isNew;
  }

  revert() {
    for (const field in this.prev) {
      this.attr[field] = this.prev[field];
    }
    this.prev = {};
    this._isDeleted = false;
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
    //console.log(this.prev[field]);
  }

  fetch(ctrl: any = null): void {}
}
