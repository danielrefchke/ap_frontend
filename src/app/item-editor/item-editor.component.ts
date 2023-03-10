import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusItemService } from '../bus-item.service';
import { Elemento } from '../elemento';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Autenticated } from '../autenticated';
import { AuthService } from '../auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SincroService } from '../sincro.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ItemEditorComponent extends Autenticated {
  @ViewChild('modalitem') reftemplate: TemplateRef<any>;

  modalRef?: BsModalRef;

  formulario: FormGroup;

  constructor(
    auth: AuthService,
    private bus: BusItemService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private sinc: SincroService
  ) {
    super(auth);
    this.bus.mensaje.subscribe((mensaje) => {
      this.editThis(mensaje);
    });

    this.sinc.saved.subscribe((mensaje) => {
      this.modalRef?.hide();
    });

    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      classType: [null, [Validators.required]],
      contDinamico: ['', [Validators.required]],
    });
  }

  get Nombre() {
    return this.formulario.get('nombre');
  }

  get Titulo() {
    return this.formulario.get('titulo');
  }

  get Descripcion() {
    return this.formulario.get('descripcion');
  }

  get ClassType() {
    return this.formulario.get('classType');
  }

  get ContenidoDinamico() {
    return this.formulario.get('contDinamico');
  }

  get elemento(): Elemento {
    return this.bus.getElemento();
  }

  get TypeElement() {
    return [
      { key: 'element-grap', value: 'Grafico' },
      { key: 'element-languaje', value: 'Texto' },
      { key: 'element-img', value: 'Imagen' },
    ];
  }

  public editThis(mensaje) {
    //this.elemento = e;
    if (this.elemento) {
      //console.log(e.titulo);

      this.formulario.controls['nombre'].setValue(this.elemento.nombre);
      this.formulario.controls['titulo'].setValue(this.elemento.titulo);
      this.formulario.controls['descripcion'].setValue(
        this.elemento.descripcion
      );
      this.formulario.controls['classType'].setValue(this.elemento.classType);
      this.formulario.controls['contDinamico'].setValue(
        this.elemento.contDinamico
      );
      if (mensaje) {
        this.formulario.reset();
      }

      this.modalRef = this.modalService.show(this.reftemplate, {
        id: 1,
        class: 'modal-lg',
      });
      //this.modalRef.setClass('modal-lg');
    }
    //console.log("edita el objeto "+e);
  }

  public saveData() {
    this.elemento.nombre = this.formulario.get('nombre').value;
    this.elemento.titulo = this.formulario.get('titulo').value;
    this.elemento.descripcion = this.formulario.get('descripcion').value;
    this.elemento.classType = this.formulario.get('classType').value;
    this.elemento.contDinamico = this.formulario.get('contDinamico').value;
    //this.sinc.sincr(this.elemento);

    this.bus.change.emit(this.elemento);
  }

  public cancelData():void{
    this.elemento.revert();
    this.modalRef?.hide();
  }

  public eliminar() {
    if (confirm('Eliminar')) {
      //let i = this.colleccion.indexOf(this.elemento);
      //this.colleccion.splice(i, 1);
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '15rem',
    maxHeight: '15rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'fontSize',
        'customClasses',
        'insertImage',
        'insertVideo',
        'toggleEditorMode',
        'heading',
        'fontName',
        'backgroundColor',
        'indent',
        'outdent',
      ],
    ],
  };
}
