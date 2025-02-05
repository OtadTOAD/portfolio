import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/lara';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { provideTranslateService, TranslateLoader } from '@ngx-translate/core'
import { HttpLoaderFactory } from './app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'system',
          cssLayer: {
            name: "primeng",
            order: 'app-styles, primeng'
          },
        }
      }
    }),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: HttpLoaderFactory
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
