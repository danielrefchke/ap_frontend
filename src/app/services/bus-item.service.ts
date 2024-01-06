import { EventEmitter, Injectable, Output } from '@angular/core';
import { Elemento } from '../class/elemento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seccion } from '../class/seccion';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusItemService {
  elemento: Elemento;
  seccion: Seccion;
  //formulario: FormGroup;
  @Output() change: EventEmitter<any> = new EventEmitter();
  private mensajero = new Subject<any>();

  mensaje = this.mensajero.asObservable();

  constructor() {  }

  public editThis(e: Elemento,reset=false) {
    this.elemento = e;
    
    this.mensajero.next(reset);
    
  }

  public getElemento(): Elemento {
    return this.elemento;
  }

}
