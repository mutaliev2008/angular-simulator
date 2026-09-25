import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nara from '@primeuix/themes/nora';
import { AppTheme } from '../enum/AppTheme';
import { Preset } from '@primeuix/themes';
import { loggingInterceptor } from '../interceptor/logging.interceptor';
import { errorInterceptor } from '../interceptor/error.interceptor';
import { authInterceptor } from './features/auth/interceptor/auth.interceptor';
import { AuthService } from './features/auth/services/auth.service';

function getPreset(): Preset {
  const theme: string | null = localStorage.getItem('color');
  switch (theme) {
  case AppTheme.AURA:
    return Aura;
    break;
  case AppTheme.LARA:
    return Lara;
    break;
  case AppTheme.NORA:
    return Nara;
    break;
  default:
    return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withXhr()),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return authService.loadCurrentUser();
    }),
    providePrimeNG({
      theme: {
        preset: getPreset(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    provideHttpClient(withInterceptors([loggingInterceptor, errorInterceptor, authInterceptor]))
  ]
};
