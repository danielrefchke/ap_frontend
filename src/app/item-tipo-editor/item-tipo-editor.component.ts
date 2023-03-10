import { Component, forwardRef, Input} from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'app-item-tipo-editor',
  templateUrl: './item-tipo-editor.component.html',
  styleUrls: ['./item-tipo-editor.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemTipoEditorComponent),
      multi: true,
    },
  ],
})
export class ItemTipoEditorComponent implements ControlValueAccessor {
  tipo: string;
  @Input() formGroup?: FormGroup;

  activeTab = '';

  public onChange: any = (_: any) => {};
  public onTouch: any = () => {};

  constructor() {
    this.tipo = '';
  }

  cambiarTipo(t: string) {
    this.tipo = t;
    this.onTouch();
    this.onChange(t);
  }

  incializar() {
    console.log('inicializa');
  }

  writeValue(obj: any): void {
    this.tipo = obj;
    this.onChange(obj);
    this.activeTab = obj;
  }

  isActive(t: string): boolean {
    return this.activeTab == t;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
  }

  public get ClassType() {
    return this.formGroup.get('classType');
  }

  public get ContenidoDinamico() {
    return this.formGroup.get('contDinamico');;
  }
}
