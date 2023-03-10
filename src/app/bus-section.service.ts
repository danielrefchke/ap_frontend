import { Injectable } from '@angular/core';
import { BusItemService } from './bus-item.service';
import { Elemento } from './elemento';
import { Seccion } from './seccion';

@Injectable({
  providedIn: 'root',
})
export class BusSectionService {
  seccion: Seccion;

  constructor(private itemSevice: BusItemService) {
    this.itemSevice.change.subscribe((data) => {
      if (this.seccion) {
        this.seccion.elementos.push(data)
        this.seccion = null;
      }
    });
  }

  public additem(s: Seccion) {
    this.seccion = s;

    this.itemSevice.editThis(new Elemento({}),true);
    //this.itemSevice.Formulario.reset();
  }
}
