import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/user-layout/user-layout.component').then(
        module => module.UserLayoutComponent
      ),
    children: [
      {
        path: 'user-data',
        loadComponent: () =>
          import(
            './containers/personal-settings/personal-settings.component'
          ).then(module => module.PersonalSettingsComponent),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./containers/unit-settings/unit-settings.component').then(
            module => module.UnitSettingsComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './containers/additional-settings/additional-settings.component'
          ).then(module => module.AdditionalSettingsComponent),
      },
    ],
  },
];
