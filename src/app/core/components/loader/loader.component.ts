import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../../services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;

}
