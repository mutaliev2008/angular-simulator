import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-authorized-user-layout',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './authorized-user-layout.component.html',
  styleUrl: './authorized-user-layout.component.scss',
})
export class AuthorizedUserLayoutComponent {}
