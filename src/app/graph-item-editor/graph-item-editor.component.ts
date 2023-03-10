import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-graph-item-editor',
  templateUrl: './graph-item-editor.component.html',
  styleUrls: ['./graph-item-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GraphItemEditorComponent),
      multi: true,
    },
  ],
})
export class GraphItemEditorComponent implements ControlValueAccessor {
  valor:any;

  public onChange: any = (_: any) => {};
  public onTouch: any = () => {};


  constructor(){
    this.valor=0;
  }

  modificado(obj: any): void{
    //console.log(obj);
    
    this.valor = obj.target.value;
    this.onTouch();
    this.onChange(obj.target.value);
    
  };

  writeValue(obj: any): void {
    this.valor = isNaN(obj)? 0:obj;
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
