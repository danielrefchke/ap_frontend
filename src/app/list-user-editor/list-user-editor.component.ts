import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Collection } from '../collection';
import { SincroService } from '../sincro.service';
import { User } from '../user';

@Component({
  selector: "app-list-user-editor",
  templateUrl: "./list-user-editor.component.html",
  styleUrls: ["./list-user-editor.component.sass"],
})
export class ListUserEditorComponent {
  formularioUser: FormGroup;
  listaUsers: Collection<User>;
  user: User;

  constructor(private formBuilder: FormBuilder, private sincro: SincroService) {
    this.formularioUser = this.formBuilder.group({
      nombre: ["", []],
      //cssclass: ['', []],
    });
    this.listaUsers = this.sincro.userList;
  }

  editUser(u: User): void {
    this.user = u;

    this.formularioUser.get("nombre").setValue(u.nombre);
  }

  saveUser(): void {
    if (
      this.formularioUser.get("nombre").value == ""
      //|| this.formularioUser.get('cssclass').value == ''
    ) {
      return;
    }

    if (!this.user) {
      this.user = new User({ id: 0, nombre: "", token: "" });
      this.listaUsers.push(this.user);
    }

    this.user.nombre = this.formularioUser.get("nombre").value;
    //this.icon.cssclass = this.formularioUser.get('cssclass').value;

    this.user = null;

    this.formularioUser.get("nombre").setValue("");
    //this.formularioUser.get('cssclass').setValue('');
  }

  deleteUser(u: User): void {
    u.delete();
  }

  undeleteUser(u: User): void {
    u.unDelete();
  }
}
