import { Routes } from '@angular/router';
import { HomeComponent } from './home/containers/home/home.component';
import { authGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/containers/home-routing/home-routing.component').then(
        module => module.HomeRoutingComponent
      ),
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./user/user.routes').then(module => module.routes),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.routes').then(module => module.routes),
  },
];
