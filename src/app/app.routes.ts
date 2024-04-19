import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/people',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'people',
        loadComponent: () =>
          import('./pages/people-page/people-page.component').then(
            (c) => c.PeoplePageComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about-page/about-page.component').then(
            (c) => c.AboutPageComponent
          ),
      },
    ],
  },
];
