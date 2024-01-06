import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Collection } from '../../class/collection';
import { Image } from '../../class/image';
import { SincroService } from '../../services/sincro.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagePickerComponent),
      multi: true,
    },
  ],
})
export class ImagePickerComponent implements ControlValueAccessor {
  public imagenes?: Collection<Image> ;

  seleccionada: any;

  public onChange: any = (_: any) => {};
  public onTouch: any = () => {};

  constructor(private sincro: SincroService) {
    this.imagenes = this.sincro.loadImageList();
  }

  cssSelccionada(obj:string):boolean{
    //console.log(obj == this.seleccionada);
    return obj == this.seleccionada;
    
  };

  imgSelected(obj: string) {
   // console.log(obj);

    this.seleccionada = obj;
    this.onTouch();
    this.onChange(obj);
  }

  writeValue(obj: any): void {
    //throw new Error('Method not implemented.');
    this.seleccionada = obj;
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
