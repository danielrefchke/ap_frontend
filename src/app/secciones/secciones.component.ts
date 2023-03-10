import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Autenticated } from '../autenticated';
import { AuthService } from '../auth.service';
import { Elemento } from '../elemento';
import { SincroService } from '../sincro.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.sass'],
})
export class SeccionesComponent
  extends Autenticated
  
{
  secciones;
  private fistTime: boolean;

  private evt: CdkDragDrop<Elemento[]>;

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

    this.sincro.error.subscribe((data) => {
      if (this.evt) {
        moveItemInArray(
          this.evt.container.data,
          this.evt.currentIndex,
          this.evt.previousIndex
        );
      }
      this.evt = null;
    });

    this.secciones = this.sincro.Secciones;
  }

  showIcon(cls:string):string{
    let result:string;
    switch (cls) {
      case 'element-list':
        result = 'fa fa-bars';
        break;
      case 'element-list-table':
        result = 'fa fa-th-large';
        break;

      default:
        result = '';
        break;
    }
    return result;
  }

  processClass(cls:string):string{
    if(cls == 'element-list-table' && this.isLogged){
      return 'element-list';
    }

    return cls;
  }

  drop(event: CdkDragDrop<Elemento[]>) {
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
      element.orden=index+1;
    }
    this.sincro.sincr(event.container.data[event.currentIndex], 'spinnerDrop');
  }
}
