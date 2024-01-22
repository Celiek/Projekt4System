import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { ImportPageComponent } from '../import-page/import-page.component';
import { UsersPageComponent } from '../users-page/users-page.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { RouterModule } from '@angular/router';
import { Md5 } from 'md5-typescript';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    NgbModule,
    FontAwesomeModule,
    AppComponent,
    RouterModule,
    // LandingPageComponent,
    // ImportPageComponent,
    // UsersPageComponent,
    HttpClientModule,
    Md5,
  ],
  providers: [UserServiceService],
  bootstrap: []
})

export class AppModule {
  constructor(library: FaIconLibrary){}
}
