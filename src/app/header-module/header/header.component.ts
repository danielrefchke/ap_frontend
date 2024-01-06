import { Component } from '@angular/core';
import { Header } from '../../class/header';
import { SincroService } from '../../services/sincro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent  {
  header:Header;

  constructor(
    private sincro: SincroService
  ) {
    
    sincro.loaded.subscribe((data) => {
      this.header = sincro.Header;
    });

}


  public editThis() {
    //this.bus.editHeader(this.header);
    //this.bus.editSocial(this.sincro.SocialMedia);
    //console.log(this.sincro.SocialMedia);
    
  }
}
