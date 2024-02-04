import { Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Environment } from 'environments/environment.base';
import { environmentFullData } from 'environments/environment.full';
import { headlessEnvironmentData } from 'environments/environment.headless';
import { StorageService } from './storage.service';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public environment = signal<Environment>(environment);

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {
    this.environment.set(environment);
    if (this.storageService.get('isHeadless') === 'true') {
      this.storageService.set(
        'isHeadless',
        this.environment().isHeadless.toString()
      );
    } else {
      this.environment.update(env => ({ ...env, isHeadless: false }));
    }
  }

  switchToHeadless() {
    this.storageService.set('isHeadless', 'true');
    this.environment.set(headlessEnvironmentData);
    this.router.navigate(['/']);
  }

  switchToHosted() {
    this.storageService.set('isHeadless', 'false');
    this.environment.set(environmentFullData);
    this.router.navigate(['/login']);
  }
}
