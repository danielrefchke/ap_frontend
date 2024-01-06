import { Component,Input, OnInit } from '@angular/core';
import { Autenticated } from '../../autenticated';
import { AuthService } from '../../services/auth.service';
import { BusItemService } from '../../services/bus-item.service';
import { Collection } from '../../class/collection';
import { Elemento } from '../../class/elemento';
import { Seccion } from '../../class/seccion';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass'],
})
export class ItemComponent extends Autenticated {
  @Input() elementos: Collection<Elemento>;

  constructor(auth: AuthService, private bus: BusItemService) {
    super(auth);
  }
  
  public toNumber(value:string):number {
    return Number.parseFloat(value);
  }
  
}
