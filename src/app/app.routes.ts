import { Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/contact-page', pathMatch: 'full' },
    { path: 'about-page', component: AboutPageComponent },
    { path: 'contact-page', component: ContactPageComponent },
];
