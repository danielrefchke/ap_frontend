import { Component } from '@angular/core';
import { SincroService } from '../services/sincro.service';

@Component({
  selector: 'app-spiner-message',
  templateUrl: './spiner-message.component.html',
  styleUrls: ['./spiner-message.component.sass']
})

export class SpinerMessageComponent {
  public sincromsg;
  constructor(private sincro: SincroService){
    this.sincromsg = sincro;
  }

}
