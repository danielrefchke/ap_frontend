import { Component, Input } from '@angular/core';
import { Autenticated } from '../../autenticated';
import { AuthService } from '../../services/auth.service';
import { BusSectionService } from '../../services/bus-section.service';

@Component({
  selector: 'app-agregador-item-seccion',
  templateUrl: './agregador-item-seccion.component.html',
  styleUrls: ['./agregador-item-seccion.component.sass'],
})
export class AgregadorItemSeccionComponent extends Autenticated {
  @Input() seccion;

  constructor(auth: AuthService, private editsec: BusSectionService) {
    super(auth);
  }

  public agregarItem() {
    this.editsec.additem(this.seccion);
  }
}
