import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Autenticated } from '../../autenticated';
import { AuthService } from '../../services/auth.service';
import { Collection } from '../../class/collection';
import { CONNECTIONS } from '../../constants';
import { IconSocialMedia } from '../../class/icon-social-media';
import { SincroService } from '../../services/sincro.service';
import { User } from '../../class/user';

@Component({
  selector: "app-config-editor",
  templateUrl: "./config-editor.component.html",
  styleUrls: ["./config-editor.component.sass"],
})
export class ConfigEditorComponent extends Autenticated {
  modalRef?: BsModalRef;
  socialMedia: Collection<IconSocialMedia>;
  formulario: FormGroup;
  user: User;

  constructor(
    auth: AuthService,
    private formBuilder: FormBuilder,
    private sincro: SincroService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) {
    super(auth);
    this.formulario = this.formBuilder.group(
      {
        nombre: [{ value: "", disabled: true }, [Validators.required]],
        password: ["", [Validators.minLength(8)]],
        password2: ["", [Validators.minLength(8)]],
      },
      {
        validator: this.mustMatch("password", "password2"),
      }
    );
    this.socialMedia = this.sincro.SocialMedialist;

    this.sincro.saved.subscribe((mensaje) => {
      this.spinner.hide("spinnerConfig");
      this.modalRef?.hide();
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors["mustMatch"]) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  edit(template: TemplateRef<any>): void {
    this.user = this.auth.userLogged();

    this.formulario.get("nombre").setValue(this.user.nombre);
    this.formulario.get("password").setValue("");
    this.formulario.get("password").setValue("");

    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass("modal-lg");
  }

  cancelData(): void {
    this.sincro.userList.undoAll();
    this.sincro.SocialMedialist.undoAll();
    this.modalRef?.hide();
  }

  saveData(): void {
    //this.modalRef?.hide();
    if (this.formulario.get("password").value != "") {
      //this.user.nombre = this.formulario.get('nombre').value
      this.user.loaded(); // indicar que no es nuevo
      this.user.password = this.formulario.get("password").value;
      console.log("cambia el password" + this.user.password);

      let tmp: Collection<User> = new Collection<User>(
        User,
        CONNECTIONS.USER_LIST
      );
      this.spinner.show("spinnerConfig");
      tmp.push(this.user);
      this.sincro.sincr(tmp);
    }

    this.sincro.sincr(this.sincro.userList);
    this.sincro.sincr(this.sincro.SocialMedialist);
  }
}
