import { EventEmitter, Injectable, Output } from '@angular/core';
import { Header } from './header';
import { Seccion } from './seccion';
import { Socialmedia } from './socialmedia';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Collection } from './collection';
import { IconSocialMedia } from './icon-social-media';
import { HttpController } from './http-controler';
import { Image } from './image';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class SincroService {
  header?: Header;
  social?: Collection<Socialmedia>;
  secciones?: Collection<Seccion>;
  headerList: Collection<Header>;
  imgList: Collection<Image>
  iconSocialList:Collection<IconSocialMedia>;
  users:Collection<User>;

  httpController = new HttpController('');

  @Output() loaded: EventEmitter<any> = new EventEmitter();
  private loadSubject = new Subject<any>();

  @Output() saved: EventEmitter<any> = new EventEmitter();
  private saveSubject = new Subject<any>();

  @Output() error: EventEmitter<any> = new EventEmitter();
  private errorSubject = new Subject<any>();

  mensajeLoad = this.loadSubject.asObservable();
  mensajeSave = this.saveSubject.asObservable();
  mensajeError = this.errorSubject.asObservable();

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    //this.loadSubject.next(true);
    this.iconSocialList = new Collection<IconSocialMedia>(
      IconSocialMedia,
      'assets/json/sitessocial.json'
    );
    this.imgList = new Collection<Image>(Image, 'assets/json/imagenes.json');
    this.load();
  }

  load() {
    let self = this;
    this.social = new Collection<Socialmedia>(
      Socialmedia,
      'assets/json/media.json'
    );
    this.secciones = new Collection<Seccion>(Seccion, 'assets/json/secciones.json')
    this.headerList = new Collection<Header>(Header, 'assets/json/header.json');
    this.spinner.show('spinnerPrincipal');
    self.fetchHeader();
    self.fetch(self.secciones);
    self.fetch(self.social);
    self.fetch(this.imgList);
    self.fetch(this.iconSocialList);
  }

  loadImageList():Collection<Image> {
    
    return this.imgList;
  }

  fetchHeader():void{
    const ctrl = this;
    setTimeout(() => {
      ctrl.httpController
        .get(ctrl.headerList.url)
        .then((response) => {
          //console.log(response); // Manejamos la respuesta aquí
          ctrl.headerList.parse(response, ctrl);
          ctrl.spinner.hide('spinnerPrincipal');
          ctrl.loaded.emit(ctrl.headerList);
        })
        .catch((error) => {
          console.error(error); // Manejamos el error aquí
        });
    }, 5000);
  }

  fetch(c: Collection<any>): void {
    const ctrl = this;
    // codigo temporario para probar algunas cosas
    setTimeout(() => {
      ctrl.httpController
        .get(c.url)
        .then((response) => {
          //console.log(response); // Manejamos la respuesta aquí
          c.parse(response, ctrl);
          ctrl.loaded.emit(c);
        })
        .catch((error) => {
          console.error(error); // Manejamos el error aquí
        });
    }, 5000);
    
  }

  sincr(obj, spnr = 'spinnerEdit'): void {
    let self = this;
    this.spinner.show(spnr);
    setTimeout(() => {
      this.spinner.hide(spnr);
      if (this.randomBoolean()) {
        this.toastr.success('Guardado!!');
        this.saved.next(true);
      } else {
        this.error.next(true);
        this.toastr.error(
          'Vuelva a intentar en unos segundos',
          'No se pudo guardar!!'
        );
      }
    }, 3000);
  }

  randomBoolean(): boolean {
    const randomNumber = Math.random();
    if (randomNumber > 0.2) {
      return true;
    } else {
      return false;
    }
  }

  get Header(): Header {
    //return this.header;
    return this.headerList[0];
  }

  get SocialMedia(): Socialmedia[] {
    return this.social;
  }

  get SocialMedialist(): Collection<IconSocialMedia> {
    return this.iconSocialList;
  }

  get Secciones(): Seccion[] {
    return this.secciones;
  }

  get userList(): Collection<User> {
    let c = new Collection<User>(User, 'assets/json/users.json');
    this.fetch(c);
    return c;
  }
}
