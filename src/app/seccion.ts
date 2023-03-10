import { Collection } from './collection';
import { Elemento } from './elemento';
import { Model } from './model';

export class Seccion extends Model {
  public elementos: Collection<Elemento>;

  constructor(attr: {}, idAttr: string = '') {
    super(attr);
    this.elementos = new Collection<Elemento>(Elemento,
       `assets/json/seccion/${this.getValue('id')}.json`);
  }

  override fetch(ctrl: any): void {
    ctrl.fetch(this.elementos,ctrl);
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

  public get className(): string {
    return this.getValue('className');
  }

  public set className(value: string) {
    this.setValue('className', value);
  }

  public get displayMode(): string {
    return this.getValue('displayMode');
  }

  public set displayMode(value: string) {
    this.setValue('displayMode', value);
  }
  /*
  public get elementos(): Elemento[] {
    return this.getValue('elementos');
  }

  public set elementos(value: Elemento[]) {
    this.setValue('elementos', value);
  }
  */
}

/*
export class Seccion {
    constructor(
        public id: number,
        public nombre: string,
        public className: string,
        public displayMode:string,
        public elementos:Elemento[]
        ) { }
}
*/
