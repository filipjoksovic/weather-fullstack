import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor() {}

  public isHeadless = signal<boolean>(false);

  public activateHeadless() {
    this.isHeadless.set(true);
  }
}
