import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { Header } from "../../class/header";
import { Socialmedia } from "../../class/socialmedia";
import { SincroService } from "../../services/sincro.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Seccion } from "../../class/seccion";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AuthService } from "../../services/auth.service";
import { Autenticated } from "../../autenticated";
import { Collection } from "../../class/collection";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-header-editor",
  templateUrl: "./header-editor.component.html",
  styleUrls: ["./header-editor.component.sass"],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderEditorComponent extends Autenticated {
  @Input() elemento: Header;
  formulario: FormGroup;

  socialMedia: Collection<Socialmedia>;

  esocial: Socialmedia;

  seccion: Seccion;

  modalRef?: BsModalRef;

  constructor(
    auth: AuthService,
    private formBuilder: FormBuilder,
    private sincro: SincroService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) {
    super(auth);
    this.formulario = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      imgback: ["", [Validators.required]],
      imgpersona: ["", [Validators.required]],
      imgcred: ["", [Validators.required]],
    });
    this.socialMedia = this.sincro.SocialMedia;

    this.sincro.saved.subscribe((mensaje) => {
      if (
        mensaje === this.sincro.headerList ||
        mensaje === this.socialMedia ||
        mensaje === this.sincro.Secciones
      ) {
        this.spinner.hide("spinnerConfig");
        this.modalRef?.hide();
      }
    });
  }

  public editHeader(template: TemplateRef<any>) {
    //this.elemento = e;
    if (this.elemento) {
      //console.log(e.titulo);

      this.formulario.controls["nombre"].setValue(this.elemento.nombre);
      this.formulario.controls["titulo"].setValue(this.elemento.titulo);
      this.formulario.controls["descripcion"].setValue(
        this.elemento.descripcion
      );
      this.formulario.controls["imgback"].setValue(this.elemento.imgback);
      this.formulario.controls["imgpersona"].setValue(this.elemento.imgpersona);
      this.formulario.controls["imgcred"].setValue(this.elemento.imgcred);
    }
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass("modal-lg");
  }

  get header(): Header {
    return this.elemento;
  }

  public saveData(): void {
    this.header.nombre = this.formulario.get("nombre").value;
    this.header.titulo = this.formulario.get("titulo").value;
    this.header.descripcion = this.formulario.get("descripcion").value;
    this.header.imgback = this.formulario.get("imgback").value;
    this.header.imgcred = this.formulario.get("imgcred").value;
    this.header.imgpersona = this.formulario.get("imgpersona").value;
    this.spinner.show("spinnerConfig");
    this.sincro.sincr(this.sincro.headerList);
    this.sincro.sincr(this.socialMedia);
    this.sincro.sincr(this.sincro.Secciones);
  }

  public cancelData(): void {
    this.sincro.headerList.undoAll();
    this.socialMedia.undoAll();
    this.sincro.Secciones.undoAll();
    this.modalRef?.hide();
  }

  get Nombre() {
    return this.formulario.get("nombre");
  }

  get Titulo() {
    return this.formulario.get("titulo");
  }

  get Descripcion() {
    return this.formulario.get("descripcion");
  }

  get imgcred() {
    return this.formulario.get("imgcred");
  }
  get imgback() {
    return this.formulario.get("imgback");
  }

  get imgpersona() {
    return this.formulario.get("imgpersona");
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "15rem",
    maxHeight: "15rem",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [
      [
        "fontSize",
        "customClasses",
        "insertImage",
        "insertVideo",
        "toggleEditorMode",
        "heading",
        "fontName",
        "backgroundColor",
        "indent",
        "outdent",
      ],
    ],
  };
}
