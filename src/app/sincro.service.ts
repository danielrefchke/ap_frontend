import { EventEmitter, Injectable, Output } from "@angular/core";
import { Header } from "./header";
import { Seccion } from "./seccion";
import { Socialmedia } from "./socialmedia";
import { Subject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Collection } from "./collection";
import { IconSocialMedia } from "./icon-social-media";
import { HttpController } from "./http-controler";
import { Image } from "./image";
import { User } from "./user";
import { CONNECTIONS } from "./constants";
import { Model } from "./model";

@Injectable({
  providedIn: "root",
})
export class SincroService {
  header?: Header;
  social?: Collection<Socialmedia>;
  secciones?: Collection<Seccion>;
  headerList: Collection<Header>;
  imgList: Collection<Image>;
  iconSocialList: Collection<IconSocialMedia>;
  users: Collection<User>;

  httpController = new HttpController(CONNECTIONS.BASE_PATH);

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
      CONNECTIONS.ICONS
    );
    this.imgList = new Collection<Image>(Image, CONNECTIONS.IMAGES);
    this.load();
  }

  load() {
    //let self = this;
    this.social = new Collection<Socialmedia>(
      Socialmedia,
      CONNECTIONS.SOCIAL_MEDIA
    );
    this.secciones = new Collection<Seccion>(Seccion, CONNECTIONS.SECCIONES);
    this.headerList = new Collection<Header>(Header, CONNECTIONS.DATA_API);
    this.users = new Collection<User>(User, CONNECTIONS.USER_LIST);
    this.spinner.show("spinnerPrincipal");
    this.fetchHeader();
    /*self.fetch(self.secciones);
    self.fetch(self.social);*/
    this.fetch(this.imgList);
    this.fetch(this.iconSocialList);
    //this.fetch(this.users);
  }

  loadImageList(): Collection<Image> {
    return this.imgList;
  }

  fetchHeader(): void {
    const ctrl = this;
    ctrl.httpController
      .get(CONNECTIONS.DATA_API)
      .then((response) => {
        //console.log(response); // Manejamos la respuesta aquí
        ctrl.header = new Header({
          id: response["id"],
          nombre: response["nombre"],
          titulo: response["titulo"],
          descripcion: response["descripcion"],
          imgback: response["imgback"],
          imgpersona: response["imgpersona"],
          imgcred: response["imgcred"],
        });

        ctrl.headerList.push(ctrl.header);
        ctrl.header.loaded();
        console.log(response["redes"]);

        ctrl.social.parse(response["redes"]);
        ctrl.secciones.parse(response["secciones"]);
        ctrl.loaded.emit(ctrl.social);
        ctrl.loaded.emit(ctrl.headerList);
      })
      .catch((error) => {
        console.error(error); // Manejamos el error aquí
      })
      .finally(() => ctrl.spinner.hide("spinnerPrincipal"));
  }

  fetch(c: Collection<any>): void {
    const ctrl = this;
    // codigo temporario para probar algunas cosas
    //setTimeout(() => {
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
  }

  async sincr(collection: Collection<Model>, spnr = "spinnerEdit") {
    let self = this;

    const promises = [];

    for (const obj of collection) {
      let promise;
      if (obj.isNew && !obj.isDeleted) {
        promise = this.httpController
          .post(collection.url, obj.serialize())
          .then((response) => {
            obj.unserialize(response);
            this.saved.next(obj);
          })
          .catch((error) => {
            console.error(error); // Manejamos el error aquí
          })
          .finally(() => {});
      }

      if (obj.isChanged && !obj.isNew && !obj.isDeleted) {
        promise = this.httpController
          .put(collection.url, obj.serialize())
          .then((response) => {
            obj.unserialize(response);
            this.saved.next(obj);
          })
          .catch((error) => {
            console.error(error); // Manejamos el error aquí
          })
          .finally(() => {});
      }

      if (!obj.isNew && obj.isDeleted) {
        promise = this.httpController
          .delete(collection.url, obj.serialize())
          .then((response) => {
            let index = collection.indexOf(obj);
            collection.splice(index, 1);
          })
          .catch((error) => {
            console.error(error); // Manejamos el error aquí
          })
          .finally(() => {});
      }

      if (obj.isNew && obj.isDeleted) {
        let index = collection.indexOf(obj);
        collection.splice(index, 1);
      }

      promises.push(promise);
    }

    await Promise.all(promises);

    this.saved.next(collection);

    //this.spinner.show(spnr);
    //setTimeout(() => {
    /* this.spinner.hide(spnr);
      
        this.toastr.success("Guardado!!");
        this.saved.next(true);
     
        this.error.next(true);
        this.toastr.error(
          "Vuelva a intentar en unos segundos",
          "No se pudo guardar!!"
        );
      }*/
    //}, 3000);
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
    return this.header;
    //return this.headerList[0];
  }

  get SocialMedia(): Collection<Socialmedia> {
    return this.social;
  }

  get SocialMedialist(): Collection<IconSocialMedia> {
    return this.iconSocialList;
  }

  get Secciones(): Seccion[] {
    return this.secciones;
  }

  get userList(): Collection<User> {
    this.fetch(this.users);
    return this.users;
  }
}
