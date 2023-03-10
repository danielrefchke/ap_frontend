import { Injectable } from '@angular/core';
import { Header } from './header';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socialmedia } from './socialmedia';

@Injectable({
  providedIn: 'root',
})
export class BusHeaderService {
  /*elemento: Header;
  formulario: FormGroup;
  socialMedia: Socialmedia[];

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imgback: ['', [Validators.required]],
      imgpersona: ['', [Validators.required]],
      imgcred: ['', [Validators.required]],
      socialicon: ['', []],
      socialurl: ['', []],
      seccion: ['', []],
    });
  }

  public editHeader(e: Header) {
    this.elemento = e;
    if (this.elemento) {
      //console.log(e.titulo);

      this.formulario.controls['nombre'].setValue(e.nombre);
      this.formulario.controls['titulo'].setValue(e.titulo);
      this.formulario.controls['descripcion'].setValue(e.descripcion);
      this.formulario.controls['imgback'].setValue(e.imgback);
      this.formulario.controls['imgpersona'].setValue(e.imgpersona);
      this.formulario.controls['imgcred'].setValue(e.imgcred);
    }
    //console.log("edita el objeto "+e);
  }

  public editSocial(media: Socialmedia[]) {
    this.socialMedia = media;
    //this.formulario.controls['socialicon'].setValue('');
    //this.formulario.controls['socialurl'].setValue('');
  }

  get Formulario(): FormGroup {
    return this.formulario;
  }

  get header(): Header {
    return this.elemento;
  }

  get social(): Socialmedia[] {
    return this.socialMedia;
  }*/
}
