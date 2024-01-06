import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Collection } from '../../class/collection';
import { IconSocialMedia } from '../../class/icon-social-media';
import { SincroService } from '../../services/sincro.service';

@Component({
  selector: "app-icon-editor",
  templateUrl: "./icon-editor.component.html",
  styleUrls: ["./icon-editor.component.sass"],
})
export class IconEditorComponent {
  formularioIcono: FormGroup;
  socialMedia: Collection<IconSocialMedia>;
  icon: IconSocialMedia;
  valor: string;

  constructor(private formBuilder: FormBuilder, private sincro: SincroService) {
    this.formularioIcono = this.formBuilder.group({
      nombre: ["", []],
      cssclass: ["", []],
    });
    this.socialMedia = this.sincro.SocialMedialist;
    this.valor = "";
  }

  modificado(obj: any): void {
    //console.log(obj);
    this.valor = obj.target.value;
    /*this.onTouch();
    this.onChange(this.valor);
    console.log(this.valor);*/
  }

  editIcon(i: IconSocialMedia): void {
    this.icon = i;

    this.formularioIcono.get("nombre").setValue(i.nombre);
    this.formularioIcono.get("cssclass").setValue(i.cssclass);

    this.valor = i.cssclass;
  }

  saveIcon(): void {
    if (
      this.formularioIcono.get("nombre").value == "" ||
      this.formularioIcono.get("cssclass").value == ""
    ) {
      return;
    }

    if (!this.icon) {
      this.icon = new IconSocialMedia({ id: 0, nombre: "", cssclass: "" });
      this.socialMedia.push(this.icon);
    }

    this.icon.nombre = this.formularioIcono.get("nombre").value;
    this.icon.cssclass = this.formularioIcono.get("cssclass").value;

    this.icon = null;

    this.formularioIcono.get("nombre").setValue("");
    this.formularioIcono.get("cssclass").setValue("");
    this.valor = "";
  }

  eliminarIcon(icon: IconSocialMedia): void {
      icon.delete();
  }

  deshacerEliminar(icon: IconSocialMedia): void {
    
      icon.unDelete();
   
  }
}
