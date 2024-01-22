import { Routes } from '@angular/router';
import { ImportPageComponent } from './import-page/import-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
    {
        path: 'home',
        component: LandingPageComponent,
        title: '4system Landing'
    },
    {
        path: 'import',
        component: ImportPageComponent,
        title: '4system Import'
    },
    {
        path: 'users',
        component: UsersPageComponent,
        title: '4system Users'
    }
];


export default routes;