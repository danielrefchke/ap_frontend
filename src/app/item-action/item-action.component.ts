import { Component, Input, TemplateRef } from '@angular/core';
import { Autenticated } from '../autenticated';
import { AuthService } from '../auth.service';
import { BusItemService } from '../bus-item.service';
import { Elemento } from '../elemento';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SincroService } from '../sincro.service';

@Component({
  selector: 'app-item-action',
  templateUrl: './item-action.component.html',
  styleUrls: ['./item-action.component.sass'],
})
export class ItemActionComponent extends Autenticated {
  @Input() elemento: Elemento;
  @Input() colleccion: Elemento[];

  modalRef?: BsModalRef;
  
  private tmp: Elemento;

  constructor(
    auth: AuthService,
    private bus: BusItemService,
    private modalService: BsModalService,
    private sincro: SincroService
  ) {
    super(auth);

    this.sincro.saved.subscribe((mensaje) => {
      if (this.tmp) {
        let i = this.colleccion.indexOf(this.elemento);
        this.colleccion.splice(i, 1);
        this.modalRef.hide();
        this.tmp = null;
      }
    });
  }

  public editThis(e: Elemento) {
    this.bus.editThis(e);
  }

  public eliminar(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public confirmaEliminar() {
    this.tmp = this.elemento;
    this.sincro.sincr(this.elemento);
  }
}
