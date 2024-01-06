import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Autenticated } from '../../autenticated';
import { AuthService } from '../../services/auth.service';
import { Elemento } from '../../class/elemento';
import { SincroService } from '../../services/sincro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Collection } from '../../class/collection';
import { Seccion } from '../../class/seccion';

@Component({
  selector: "app-secciones",
  templateUrl: "./secciones.component.html",
  styleUrls: ["./secciones.component.sass"],
})
export class SeccionesComponent extends Autenticated {
  secciones: Collection<Seccion>;
  private fistTime: boolean;

  private evt: CdkDragDrop<Collection<Elemento>>;

  constructor(
    auth: AuthService,
    private sincro: SincroService,
    private spinner: NgxSpinnerService
  ) {
    super(auth);
    this.fistTime = true;

    sincro.loaded.subscribe((data) => {
      //this.secciones = this.sincro.Secciones;
    });

    this.sincro.saved.subscribe((mensaje) => {
      if (this.evt?.container.data === mensaje) {
        this.spinner.hide("spinnerDrop");
      }
    });

    this.sincro.error.subscribe((data) => {
      if (this.evt) {/* deshabiltado este comportamiento por ahora
        moveItemInArray(
          this.evt.container.data,
          this.evt.currentIndex,
          this.evt.previousIndex
        );*/
        this.spinner.hide("spinnerDrop");
      }
      this.evt = null;
    });

    this.secciones = this.sincro.Secciones;
  }

  showIcon(cls: string): string {
    let result: string;
    switch (cls) {
      case "element-list":
        result = "fa fa-bars";
        break;
      case "element-list-table":
        result = "fa fa-th-large";
        break;

      default:
        result = "";
        break;
    }
    return result;
  }

  processClass(cls: string): string {
    if (cls == "element-list-table" && this.isLogged) {
      return "element-list";
    }

    return cls;
  }

  drop(event: CdkDragDrop<Collection<Elemento>>) {
    //console.log(event);
    this.evt = event;
    moveItemInArray(
      this.evt.container.data,
      this.evt.previousIndex,
      this.evt.currentIndex
    );
    // asignamos el nuevo orden de los elementos
    for (let index = 0; index < event.container.data.length; index++) {
      const element = event.container.data[index];
      element.orden = index + 1;
    }
    this.spinner.show("spinnerDrop");

    this.sincro.sincr(event.container.data);
  }
}
