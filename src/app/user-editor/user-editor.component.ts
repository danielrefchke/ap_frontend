import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Collection } from '../collection';
import { SincroService } from '../sincro.service';
import { User } from '../user';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.sass'],
})
export class UserEditorComponent {
  @Input() formGroup?: FormGroup;

  get Password() {
    return this.formGroup.get('password');
  }

  get Password2() {
    return this.formGroup.get('password2');
  }

  get User(){
    return this.formGroup.get('nombre');
  }
}
