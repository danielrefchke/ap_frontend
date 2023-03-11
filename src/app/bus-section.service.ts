import { Injectable } from '@angular/core';
import { BusItemService } from './bus-item.service';
import { Elemento } from './elemento';
import { Seccion } from './seccion';
import { SincroService } from './sincro.service';

@Injectable({
  providedIn: 'root',
})
export class BusSectionService {
  seccion: Seccion;
  elemento:Elemento;

  constructor(private itemSevice: BusItemService,
    private sincr:SincroService) {
    this.itemSevice.change.subscribe((data) => {
      if (this.seccion && data === this.elemento) {
        this.elemento.orden = this.seccion.elementos.length+1;
        this.seccion.elementos.push(data);
        this.sincr.sincr(this.seccion.elementos);
        this.seccion = null;
      }
    });
  }

  public additem(s: Seccion) {
    this.seccion = s;
    this.elemento = new Elemento({})
    this.itemSevice.editThis(this.elemento,true);
    //this.itemSevice.Formulario.reset();
  }
}
