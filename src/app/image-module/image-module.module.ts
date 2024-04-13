import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { RemoteImageComponent } from './remote-image/remote-image.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ImagePickerComponent,
    ImageUploaderComponent,
    RemoteImageComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  exports:[
    ImagePickerComponent,
    ImageUploaderComponent,
    RemoteImageComponent
  ]
})
export class ImageModuleModule { }
