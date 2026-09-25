import { Component } from '@angular/core';
import { faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  companyName: string = 'РУМТИБЕТ';
  faAngleRight: IconDefinition = faAngleRight;
  faVk: IconDefinition = faVk;
  faTelegram: IconDefinition = faTelegram;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

}
