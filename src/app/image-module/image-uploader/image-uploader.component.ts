import { Component } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Autenticated } from "../../autenticated";
import { AuthService } from "../../services/auth.service";
import { SincroService } from "../../services/sincro.service";


@Component({
  selector: "app-image-uploader",
  templateUrl: "./image-uploader.component.html",
  styleUrls: ["./image-uploader.component.sass"],
})
export class ImageUploaderComponent extends Autenticated {
  //cloudName = "hzxyensd5"; // replace with your own cloud name
  //uploadPreset = "aoh4fpwm";
  
  private selectedFile;
  uploadProgress = 0;

  constructor(
    auth: AuthService,
    private sincro: SincroService,
    private spinner: NgxSpinnerService
  ) {
    super(auth);

    this.sincro.saved.subscribe((mensaje) => {
      if (mensaje instanceof FormData) {
        //console.log("formdata");

        this.spinner.hide("spinnerUploader");
      }
    });

    this.sincro.error.subscribe((mensaje) => {
      if (mensaje instanceof FormData) {
        //console.log("formdata");

        this.spinner.hide("spinnerUploader");
      }
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      this.spinner.show("spinnerUploader");
      this.sincro.uploadFile(fd);
    }
  }
}
