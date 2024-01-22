import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ImportPageComponent } from './import-page/import-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
    { path: 'home' , component: LandingPageComponent},
    { path: 'import' , component: ImportPageComponent},
    { path: 'users' , component: UsersPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes),
                HttpClientModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }