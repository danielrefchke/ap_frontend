import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SincroService } from "../../services/sincro.service";
import { Socialmedia } from "../../class/socialmedia";

@Component({
  selector: "app-social-editor",
  templateUrl: "./social-editor.component.html",
  styleUrls: ["./social-editor.component.sass"],
})
export class SocialEditorComponent {
  formulariosocial: FormGroup;

  socialMedia: Socialmedia[];

  esocial: Socialmedia;

  constructor(private formBuilder: FormBuilder, private sincro: SincroService) {
    this.formulariosocial = this.formBuilder.group({
      socialicon: ["", []],
      socialurl: ["", []],
    });
    this.socialMedia = this.sincro.SocialMedia;
  }

  public editSocial(s: Socialmedia) {
    this.esocial = s;

    this.formulariosocial.get("socialicon").setValue(s.icon);
    this.formulariosocial.get("socialurl").setValue(s.url);
  }

  public guardarSocial() {
    if (
      this.formulariosocial.get("socialicon").value == "" ||
      this.formulariosocial.get("socialurl").value == ""
    ) {
      return;
    }

    if (!this.esocial) {
      this.esocial = new Socialmedia({
        id: 0,
        icon: "",
        url: "",
        orden: this.SocialList.length + 1,
      });
      this.sincro.SocialMedia.push(this.esocial);
    }
    this.esocial.icon = this.formulariosocial.get("socialicon").value;
    this.esocial.url = this.formulariosocial.get("socialurl").value;
    this.esocial = null;
    this.formulariosocial.get("socialicon").setValue("");
    this.formulariosocial.get("socialurl").setValue("");
  }

  public eliminarSocial(s: Socialmedia) {
    if (confirm("Eliminar?")) {
      let i = this.sincro.SocialMedia.indexOf(s);
      this.sincro.SocialMedia.splice(i, 1);
    }
  }

  get social(): Socialmedia[] {
    return this.sincro.SocialMedia;
  }

  get socialIcon() {
    return this.formulariosocial.get("socialicon");
  }

  get socialUrl() {
    return this.formulariosocial.get("socialurl");
  }

  get SocialList(): any[] {
    return this.sincro.SocialMedialist;
  }

  public drop(event: CdkDragDrop<Socialmedia[]>) {
    //console.log(event);

    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
