import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideProtractorTestingSupport} from '@angular/platform-browser';
import  routes  from './routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient(withFetch()),
              provideProtractorTestingSupport(),
              ]
};
