import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import routes from './app/routes';


bootstrapApplication(AppComponent,appConfig);

// const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

bootstrapApplication(AppComponent,
  {
    providers : [

      provideProtractorTestingSupport(),
      provideHttpClient(),
      provideRouter(routes),
      
    ]
  }).catch(err => console.error(err));