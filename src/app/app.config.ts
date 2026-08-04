import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
    })
  ]
};
