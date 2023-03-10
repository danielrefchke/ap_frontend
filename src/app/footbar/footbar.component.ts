import { Component } from '@angular/core';
import { SincroService } from '../sincro.service';

@Component({
  selector: 'footer',
  templateUrl: './footbar.component.html',
  styleUrls: [
    './footbar.component.sass',
  ],
})
export class FootbarComponent {
  socialmedia;

  constructor(private sincro: SincroService) {
    sincro.loaded.subscribe((data) => {
      this.socialmedia = this.sincro.SocialMedia;
    });
    this.socialmedia = this.sincro.SocialMedia;
  }
}
