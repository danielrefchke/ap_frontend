import { EventEmitter, Injectable, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() logged: EventEmitter<any> = new EventEmitter();
  private loggedSubject = new Subject<any>();
  mensajeLogged = this.loggedSubject.asObservable();

  api = '';

  token;

  user: User;

  processStatus: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.processStatus = true;
  }

  login(user: string, password: string) {
    // login hasta que este disponible el servicio backend
    this.user = null;

    /*if (user == 'admin' && password == '12345678') {
      this.user = new User(1, user, 'token');
      localStorage.setItem('user', JSON.stringify(this.user));
      this.processStatus = true;
    }*/
    let self = this;
    this.processStatus = true;
    this.spinner.show('spinnerLogin');
    setTimeout(() => {
      if (user == 'admin' && password == '12345678') {
        self.user = new User({
          id: 1,
          nombre: user,
          token: 'token',
          password: '12345678',
        });
        localStorage.setItem('user', this.user.toJson());
        self.processStatus = true;
        this.logged.emit(true);
        this.toastr.success(`Bienvenido ${user}`, 'Acceso exitoso');
      } else {
        this.processStatus = false;
      }
      self.spinner.hide('spinnerLogin');
    }, 3000);
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
  }

  get status(): boolean {
    return this.processStatus;
  }

  isLogged(): boolean {
    if (this.user) {
      return true;
    } else {
      let usr = localStorage.getItem('user');
      if (usr) {
        let t = JSON.parse(usr);
        this.user = new User(t);

        return true;
      }
    }
    return false;
  }

  userLogged():User{
    if(this.isLogged()){
      return this.user;
    }
    return null;
  }
}
