import { Routes } from '@angular/router';
import { HomeComponent } from './home/containers/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/containers/home-routing/home-routing.component').then(
        module => module.HomeRoutingComponent
      ),
    children: [{ path: '', component: HomeComponent }],
  },
];
