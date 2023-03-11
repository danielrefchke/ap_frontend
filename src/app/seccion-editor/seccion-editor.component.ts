import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { BusHeaderService } from '../bus-header.service';
import { Seccion } from '../seccion';
import { SincroService } from '../sincro.service';


@Component({
  selector: 'app-seccion-editor',
  templateUrl: './seccion-editor.component.html',
  styleUrls: ['./seccion-editor.component.sass'],
})
export class SeccionEditorComponent {
  formulario: FormGroup;

  seccion: Seccion;

  constructor(private formBuilder: FormBuilder, private sincro: SincroService) {
    this.formulario = this.formBuilder.group({
      seccion: ['', []],
      displayMode: ['', []],
      className: ['', []],
    });
  }

  public editarSeccion(s: Seccion) {
    this.seccion = s;
    this.formulario.get('seccion').setValue(s.nombre);
    this.formulario.get('displayMode').setValue(s.displayMode);
    this.formulario.get('className').setValue(s.className);
  }

  public eliminarSeccion(s: Seccion) {
    if (confirm('Eliminar?')) {
      if (s.elementos.length > 0) {
        alert('No se puede elimiar la seccion');
      } else {
        let i = this.secciones.indexOf(s);
        this.secciones.splice(i, 1);
      }
    }
  }

  public guardarSeccion() {
    if (
      this.formulario.get('displayMode').value == '' ||
      this.formulario.get('className').value == '' ||
      this.formulario.get('seccion').value == ''
    )
      return;
    
    if (!this.seccion){
      
      this.seccion = new Seccion({
        id: 0,
        nombre: "",
        className: "",
        displayMode: "",
        orden: this.secciones.length+1,
      });
      this.secciones.push(this.seccion);
    }
    
    this.seccion.nombre = this.formulario.get('seccion').value;
    this.seccion.displayMode = this.formulario.get('displayMode').value;
    this.seccion.className = this.formulario.get('className').value

    this.formulario.get('seccion').setValue('');
    this.formulario.get('displayMode').setValue('');
    this.formulario.get('className').setValue('');
    this.seccion = null;
  }

  get secciones() {
    return this.sincro.Secciones;
  }

  public dropSeccion(event: CdkDragDrop<Seccion[]>) {
    //console.log(event);

    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    for (let index = 0; index < event.container.data.length; index++) {
      const element = event.container.data[index];
      element.orden = index + 1;
    }
  }
}
