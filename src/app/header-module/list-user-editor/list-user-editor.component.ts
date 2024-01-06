import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Collection } from "../../class/collection";
import { SincroService } from "../../services/sincro.service";
import { User } from "../../class/user";

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

  async saveUser() {
    // es asincronica por fuerza
    if (
      this.formularioUser.get("nombre").value == ""
      //|| this.formularioUser.get('cssclass').value == ''
    ) {
      return;
    }

    var respuesta: boolean;
    // verificar que no exista el nombre de usuario
    await this.sincro
      .existeUsuario(this.formularioUser.get("nombre").value)
      .then((response) => {
        respuesta = response;
      });

    if (respuesta) {
        // existe el usuario
        return ;
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
