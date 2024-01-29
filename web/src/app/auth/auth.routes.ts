import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/auth-layout/auth-layout.component').then(
        module => module.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./containers/login/login.component').then(
            module => module.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./containers/register/register.component').then(
            module => module.RegisterComponent
          ),
      },
    ],
  },
];
