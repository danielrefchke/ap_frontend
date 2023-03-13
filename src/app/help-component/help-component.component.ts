import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Autenticated } from '../autenticated';
import { AuthService } from '../auth.service';

@Component({
  selector: "app-help-component",
  templateUrl: "./help-component.component.html",
  styleUrls: ["./help-component.component.sass"],
})
export class HelpComponentComponent extends Autenticated {
  modalRef?: BsModalRef;

  constructor(auth: AuthService, private modalService: BsModalService) {
    super(auth);
  }

  public showHeader(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass("modal-lg");
  }
}
