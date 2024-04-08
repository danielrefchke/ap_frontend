import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-icon-item-editor',
  templateUrl: './icon-item-editor.component.html',
  styleUrls: ['./icon-item-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconItemEditorComponent),
      multi: true,
    },
  ],
})
export class IconItemEditorComponent implements ControlValueAccessor {
  valor: string;

  public onChange: any = (_: any) => {};
  public onTouch: any = () => {};

  constructor() {
    this.valor = '';
  }

  modificado(obj: any): void {
    //console.log(obj);
    this.valor = obj.target.value;
    this.onTouch();
    this.onChange(this.valor);
    //console.log(this.valor);
  }

  writeValue(obj: string): void {
    this.valor = obj;
    this.onChange(obj);
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
}
