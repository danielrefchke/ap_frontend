import { EventEmitter, Injectable, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CONNECTIONS } from '../constants';
import { HttpController } from '../controllers/http-controler';
import { User } from '../class/user';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() logged: EventEmitter<any> = new EventEmitter();
  private loggedSubject = new Subject<any>();
  mensajeLogged = this.loggedSubject.asObservable();
  httpController = new HttpController(CONNECTIONS.BASE_PATH);

  token:string;

  user: User;

  processStatus: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.processStatus = true;
  }

  login(user: string, password: string, spinername:string = "spinnerLogin") {
    // login hasta que este disponible el servicio backend
    this.user = null;
    let temp = {
        nombre: user,
        password: password,
      } 
    /*if (user == 'admin' && password == '12345678') {
      this.user = new User(1, user, 'token');
      localStorage.setItem('user', JSON.stringify(this.user));
      this.processStatus = true;
    }*/
    let self = this;
    this.processStatus = true;
    this.spinner.show(spinername);
    //console.log(CONNECTIONS.BASE_PATH+ CONNECTIONS.AUTH_API);
    
    this.httpController
      .post(CONNECTIONS.AUTH_API, temp)
      .then((response) => {
        //console.log(response.Authorization);

        HttpController.setToken(response["Authorization"]);
        this.httpController
          .get(CONNECTIONS.USER_DATA_RECOVER + "/" + user)
          .then((response2) => {
            self.user = new User({
              id: response2["id"],
              nombre: response2["nombre"],
              password: password,
              token: response.Authorization,
            });
            localStorage.setItem("user", this.user.toJson());
            self.processStatus = true;
            self.logged.emit(true);
            self.toastr.success(`Bienvenido ${user}`, "Acceso exitoso");
          }).catch((error) =>{
            this.toastr.error("Ha habido un problema", "Error");
          });
      })
      .catch((error) => {
        this.toastr.error("No se ha podido autenticar", "Error de Acceso");
      })
      .finally(() => self.spinner.hide(spinername));
      
  }

  logout() {
    localStorage.removeItem("user");
    this.user = null;
  }

  get status(): boolean {
    return this.processStatus;
  }

  isLogged(): boolean {
    if (this.user) {
      return true;
    } else {
      let usr = localStorage.getItem("user");
      if (usr) {
        let t = JSON.parse(usr);
        this.user = new User(t);
        HttpController.setToken(this.user.getValue("token"));
        return true;
      }
    }
    return false;
  }

  userLogged(): User {
    if (this.isLogged()) {
      return this.user;
    }
    return null;
  }
}
