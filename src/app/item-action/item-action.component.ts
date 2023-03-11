import { Component, Input, TemplateRef } from '@angular/core';
import { Autenticated } from '../autenticated';
import { AuthService } from '../auth.service';
import { BusItemService } from '../bus-item.service';
import { Elemento } from '../elemento';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SincroService } from '../sincro.service';
import { Collection } from '../collection';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-item-action",
  templateUrl: "./item-action.component.html",
  styleUrls: ["./item-action.component.sass"],
})
export class ItemActionComponent extends Autenticated {
  @Input() elemento: Elemento;
  @Input() colleccion: Collection<Elemento>;

  modalRef?: BsModalRef;

  private tmp: Elemento;

  constructor(
    auth: AuthService,
    private bus: BusItemService,
    private modalService: BsModalService,
    private sincro: SincroService,
    private spinner: NgxSpinnerService
  ) {
    super(auth);

    this.sincro.saved.subscribe((mensaje) => {
      if (this.tmp === mensaje) {
        this.spinner.hide("spinnerBorrar");
        this.modalRef?.hide();
        this.tmp = null;
      }
    });

    this.bus.change.subscribe((data) => {
      if (data == this.tmp) {
        this.sincro.sincr(this.colleccion);
      }
    });
  }

  public editThis(e: Elemento): void {
    this.tmp = e;
    this.bus.editThis(e);
  }

  public eliminar(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  public confirmaEliminar() {
    this.spinner.show("spinnerBorrar");
    this.tmp = this.elemento;
    this.tmp.delete();
    this.sincro.sincr(this.colleccion);
  }
}
