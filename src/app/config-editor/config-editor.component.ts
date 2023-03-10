import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Autenticated } from '../autenticated';
import { AuthService } from '../auth.service';
import { Collection } from '../collection';
import { IconSocialMedia } from '../icon-social-media';
import { SincroService } from '../sincro.service';
import { User } from '../user';

@Component({
  selector: 'app-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.sass'],
})
export class ConfigEditorComponent extends Autenticated {
  modalRef?: BsModalRef;
  socialMedia: Collection<IconSocialMedia>;
  formulario: FormGroup;
  user:User;

  constructor(
    auth: AuthService,
    private formBuilder: FormBuilder,
    private sincro: SincroService,
    private modalService: BsModalService,
  ) {
    super(auth); 
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.minLength(8)]],
      password2: ['', [Validators.minLength(8)]],
    } ,{
      validator: this.mustMatch('password', 'password2')
    });
    this.socialMedia = this.sincro.SocialMedialist;

    this.sincro.saved.subscribe((mensaje) => {
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

    this.formulario.get('nombre').setValue(this.user.nombre);
    this.formulario.get('password').setValue('');
    this.formulario.get('password').setValue('');
    
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  cancelData(): void {
    this.modalRef?.hide();
  }

  saveData(): void {
    this.modalRef?.hide();
    if (this.formulario.get('password').value != '')
      this.user.nombre = this.formulario.get('nombre').value;

  }
}
