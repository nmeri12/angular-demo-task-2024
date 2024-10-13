import {
  ApplicationConfig,
  ErrorHandler,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {GlobalErrorHandlerService} from './core/services/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  /**
  providers: [provideExperimentalZonelessChangeDetection(),
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService}, //global error
    provideRouter(routes), provideHttpClient()]
   *
   */

   providers: [provideZoneChangeDetection({eventCoalescing: true}),
   {provide:ErrorHandler,useClass:GlobalErrorHandlerService}, //global error
   provideRouter(routes), provideHttpClient()]
};
