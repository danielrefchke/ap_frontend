import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SincroService } from '../../services/sincro.service';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconPickerComponent),
      multi: true,
    },
  ],
})
export class IconPickerComponent implements ControlValueAccessor {
  icons: any[];
  icon: string;
  showed: boolean;

  public onChange: any = (_: any) => {};
  public onTouch: any = () => {};

  constructor(private sincro: SincroService) {
    this.icons = this.sincro.SocialMedialist;
    this.showed = false;
  }

  btnClicked(): void {
    //console.log("clicked");
    
    this.showed = !this.showed;
  }

  iconSelected(icon: string): void {
    this.icon = icon;
    this.btnClicked();
    this.onTouch();
    this.onChange(icon);
  }

  writeValue(obj: any): void {
    this.icon = obj;
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
