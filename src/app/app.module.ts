import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header-module/header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FootbarComponent } from './footbar/footbar.component';
import { SeccionesComponent } from './content-module/secciones/secciones.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './content-module/item/item.component';
import { ItemEditorComponent } from './content-module/item-editor/item-editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HeaderEditorComponent } from './header-module/header-editor/header-editor.component';
import { SocialEditorComponent } from './header-module/social-editor/social-editor.component';
import { SeccionEditorComponent } from './header-module/seccion-editor/seccion-editor.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ItemActionComponent } from './content-module/item-action/item-action.component';
import { AgregadorItemSeccionComponent } from './content-module/agregador-item-seccion/agregador-item-seccion.component';
import {
  ToastrModule,
} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImagePickerComponent } from './image-module/image-picker/image-picker.component';
import { IconPickerComponent } from './header-module/icon-picker/icon-picker.component';
import { ItemTipoEditorComponent } from './content-module/item-tipo-editor/item-tipo-editor.component';
import { GraphItemEditorComponent } from './content-module/graph-item-editor/graph-item-editor.component';
import { TextItemEditorComponent } from './content-module/text-item-editor/text-item-editor.component';
import { ConfigEditorComponent } from './header-module/config-editor/config-editor.component';
import { UserEditorComponent } from './header-module/user-editor/user-editor.component';
import { IconEditorComponent } from './header-module/icon-editor/icon-editor.component';
import { ListUserEditorComponent } from './header-module/list-user-editor/list-user-editor.component';
import { ImageUploaderComponent } from './image-module/image-uploader/image-uploader.component';
import { HelpComponentComponent } from './header-module/help-component/help-component.component';
import { SpinerMessageComponent } from './spiner-message/spiner-message.component';
import { IconItemEditorComponent } from './content-module/icon-item-editor/icon-item-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FootbarComponent,
    SeccionesComponent,
    LoginComponent,
    ItemComponent,
    ItemEditorComponent,
    HeaderEditorComponent,
    SocialEditorComponent,
    SeccionEditorComponent,
    ItemActionComponent,
    AgregadorItemSeccionComponent,
    ImagePickerComponent,
    IconPickerComponent,
    ItemTipoEditorComponent,
    GraphItemEditorComponent,
    TextItemEditorComponent,
    ConfigEditorComponent,
    UserEditorComponent,
    IconEditorComponent,
    ListUserEditorComponent,
    ImageUploaderComponent,
    HelpComponentComponent,
    SpinerMessageComponent,
    IconItemEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
    DragDropModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      backgroundColor: '#e2cfb8',
      backgroundStrokeWidth: 0,
      backgroundPadding: 8,
      radius: 70,
      space: -1,
      maxPercent: 100,
      units: '',
      unitsColor: '#483500',
      outerStrokeWidth: 25,
      outerStrokeColor: '#312b1f',
      innerStrokeColor: '#312b1f',
      innerStrokeWidth: 13,
      titleColor: '#483500',
      titleFontSize: '45',
      subtitleColor: '#483500',
      animation: false,
      animateTitle: false,
      showTitle: false,
      showSubtitle: false,
      showUnits: false,
      showInnerStroke: false,
      title: '',
      subtitle: '',
      responsive: true,
    }),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar:true,
    }),
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
