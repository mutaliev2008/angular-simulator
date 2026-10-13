import { Component, inject } from '@angular/core';
import { faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';
import { IAppConfig } from '../../../../interface/IAppConfig';
import { APP_CONFIG } from '../../tokens/app-configuration.token';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  config: IAppConfig = inject(APP_CONFIG);
  faAngleRight: IconDefinition = faAngleRight;
  faVk: IconDefinition = faVk;
  faTelegram: IconDefinition = faTelegram;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

}
