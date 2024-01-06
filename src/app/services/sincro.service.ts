import { EventEmitter, Injectable, Output } from "@angular/core";
import { Header } from "../class/header";
import { Seccion } from "../class/seccion";
import { Socialmedia } from "../class/socialmedia";
import { Subject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Collection } from "../class/collection";
import { IconSocialMedia } from "../class/icon-social-media";
import { HttpController } from "../controllers/http-controler";
import { Image } from "../class/image";
import { User } from "../class/user";
import { CONNECTIONS, STATUS_MESSAGE_GROUPS } from "../constants";
import { Model } from "../class/model";

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

  private maxRetries = 5; // Número máximo de intentos de conexión al backend
  private retryDelay = CONNECTIONS.DELAY_TIME / 2; // Retraso entre reintentos en milisegundos
  public statusMessage: string = ''; // Miembro para almacenar el mensaje de estado

  private messageGroup:string[];

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
    // inicializamos los mensajes
    const randomGroupIndex = Math.floor(Math.random() * STATUS_MESSAGE_GROUPS.length);
    
    this.messageGroup = STATUS_MESSAGE_GROUPS[randomGroupIndex];
    
    this.iconSocialList = new Collection<IconSocialMedia>(
      IconSocialMedia,
      CONNECTIONS.ICONS
    );
    this.imgList = new Collection<Image>(Image, CONNECTIONS.IMAGES);
    this.load();
  }

  load() {
    //let self = this;
    this.social = new Collection<Socialmedia>(Socialmedia, "");

    this.secciones = new Collection<Seccion>(Seccion, "");
    this.headerList = new Collection<Header>(Header, CONNECTIONS.DATA_API);
    this.users = new Collection<User>(User, CONNECTIONS.USER_LIST);
    this.spinner.show("spinnerPrincipal");
    this.statusMessage = "Inicializando";
    this.startService();
    //this.fetch(this.users);
  }

  public loadData():void{
    this.statusMessage = "Preparando el café con amor y bytes";
    this.fetchHeader();
    this.fetch(this.imgList);
    this.fetch(this.iconSocialList);
  }

  public startService(): Promise<any> {
    return this.checkBackendAvailability()
      .then(() => this.loadData())
      .catch((error) => {
        // Manejar el error aquí y establecer el mensaje de estado
        console.error('Error al iniciar el servicio:', error);
        this.statusMessage = 'No se pudo conectar al backend.'+
          this.messageGroup[this.messageGroup.length-1];
        throw error; // Re-lanzar el error para que lo maneje el componente que llama a startService
      });
  }

   private checkBackendAvailability(): Promise<void> {
    let retryCount = 0;

    const attemptConnection = () => {
      return this.testBackendConnection()
        .then(() => {
          // Conexión exitosa, no se necesita reintentar
        })
        .catch((error) => {
          this.statusMessage = this.messageGroup[retryCount];
          retryCount++;
          console.log(`Retry attempt ${retryCount}`);
          if (retryCount <= this.maxRetries) {
            // Reintentar después de un retraso
            return new Promise<void>((resolve) => {
              setTimeout(() => resolve(attemptConnection()), this.retryDelay);
            });
          } else {
            // Superado el número máximo de reintentos, arrojar un error
            throw error;
          }
        });
    };

    return attemptConnection();
  }

  private testBackendConnection(): Promise<void> {
    const healthCheckPath = CONNECTIONS.START_SERVICE; // Endpoint para verificar la salud del backend

    return this.httpController
      .test(healthCheckPath) // Usa el método test de HttpController
      .catch((error) => {
        throw new Error(`Error de conexión al backend: ${error.message}`);
      });
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

        this.social.url = CONNECTIONS.SOCIAL_MEDIA + "/" + response["id"];
        this.secciones.url = CONNECTIONS.SECCIONES + "/" + response["id"];

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

  async sincr(collection: Collection<Model>) {
    let self = this;
    let errors = false;
    let operations = 0;
    const promises = [];

    for (const obj of collection) {
      let promise;
      if (obj.isNew && !obj.isDeleted) {
        promise = this.httpController
          .post(collection.url, obj.serialize())
          .then((response) => {
            obj.unserialize(response);
            this.saved.next(obj);
            operations++;
          })
          .catch((error) => {
            errors = true;
            //console.error(error); // Manejamos el error aquí
          })
          .finally(() => {});
      }

      if (obj.isChanged && !obj.isNew && !obj.isDeleted) {
        promise = this.httpController
          .put(collection.url, obj.serialize())
          .then((response) => {
            obj.unserialize(response);
            this.saved.next(obj);
            operations++;
          })
          .catch((error) => {
            //console.error(error); // Manejamos el error aquí
            errors = true;
          })
          .finally(() => {});
      }

      if (!obj.isNew && obj.isDeleted) {
        promise = this.httpController
          .delete(collection.url, obj.serialize())
          .then((response) => {
            let index = collection.indexOf(obj);
            collection.splice(index, 1);
            this.saved.next(obj);
            operations++;
          })
          .catch((error) => {
            //console.error(error); // Manejamos el error aquí
            errors = true;
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

    if (errors) {
      this.toastr.error(
        "Vuelva a intentar en unos segundos",
        "Algunos datos no se guardaron!!"
      );
    } else if (operations > 0) {
      this.toastr.success("Guardado!!");
    }

    this.saved.next(collection);
  }

  async uploadFile(formData){
    
    this.httpController
      .postFormData(CONNECTIONS.IMAGES, formData)
      .then((response) => {
        this.toastr.success("Guardado!!");
        this.fetch(this.imgList);
        this.saved.next(formData);
      })
      .catch((error) => {
        //console.error(error); // Manejamos el error aquí
        this.error.next(formData);
        this.toastr.error("No se pudo cargar el archivo!!","Error de carga");
      });
  };

  public async existeUsuario(nombre:string):Promise<boolean>{
    let respuesta:boolean;
    let promise = this.httpController
      .get(CONNECTIONS.USER_NAME_VERIFIER + "/" + nombre)
      .then((response) => {
        respuesta = response["exist"];
        if (respuesta) {
          this.toastr.error("El usuario ya existe!!", "Nombre inválido");
        }
      })
      .catch((error) => {
        //console.error(error); // Manejamos el error aquí
        this.toastr.error("No se pudo verificar!!!","Error!!");
        respuesta=true;
      });
    
    await promise;
    return respuesta;
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

  get Secciones(): Collection<Seccion> {
    return this.secciones;
  }

  get userList(): Collection<User> {
    this.fetch(this.users);
    return this.users;
  }
}
