import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { ImportPageComponent } from './import-page/import-page.component';
import { HttpClientModule } from '@angular/common/http';
import { Router,NavigationExtras } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet,
  RouterLink,
  RouterLinkActive,
  LandingPageComponent,
  UsersPageComponent,
  ImportPageComponent,
  HttpClientModule
  ],
})
export class AppComponent {
  title = '4System';

  constructor(private router: Router){
    const navigationExtras: NavigationExtras = { skipLocationChange: true };
    this.router.navigate(['/home'], navigationExtras);
  }
}
