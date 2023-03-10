import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-text-item-editor',
  templateUrl: './text-item-editor.component.html',
  styleUrls: ['./text-item-editor.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextItemEditorComponent),
      multi: true,
    },
  ],
})
export class TextItemEditorComponent implements ControlValueAccessor {
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
    this.valor = obj?.length > 2 ? obj.substring(0, 2) : obj;
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
