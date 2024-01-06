import { Model } from "./model";

export class Elemento extends Model {
  constructor(attr: {}, idAttr: string = 'id') {
    super(attr, idAttr);
  }

  public get contDinamico(): string {
    return this.getValue('contDinamico');
  }
  public set contDinamico(value: string) {
    this.setValue('contDinamico', value);
  }
  public get classType(): string {
    return this.getValue('classType');
  }
  public set classType(value: string) {
    this.setValue('classType', value);
  }
  public get descripcion(): string {
    return this.getValue('descripcion');
  }
  public set descripcion(value: string) {
    this.setValue('descripcion', value);
  }
  public get titulo(): string {
    return this.getValue('titulo');
  }
  public set titulo(value: string) {
    this.setValue('titulo', value);
  }
  public get nombre(): string {
    return this.getValue('nombre');
  }
  public set nombre(value: string) {
    this.setValue('nombre', value);
  }
  public get id(): number {
    return this.getValue('id');
  }
  public set id(value: number) {
    this.setValue('id', value);
  }

  public get orden(): number {
    return this.getValue('orden');
  }
  public set orden(value: number) {
    this.setValue('orden', value);
  }
}
