import { Component, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PrimeNGConfig } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { UntilDestroy } from '@ngneat/until-destroy';
import { StorageService } from '@core/services/storage.service';
import { UserStoreService } from './user/services/user.store.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { getDefaultUserObject, UserData } from './user/models/user-data.model';
import { DateFormatEnum } from '@core/models/date-format';
import { TimeFormatEnum } from '@core/models/time-format';
import { EnvironmentService } from '@core/services/environment.service';
import { EnvironmentBase } from 'environments/environment.base';

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    SidebarModule,
    AvatarModule,
    ToastModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Weather app';

  constructor(
    private primengConfig: PrimeNGConfig,
    private readonly storageService: StorageService,
    private readonly userStoreService: UserStoreService,
    private readonly environmentService: EnvironmentService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    if (this.environmentService.environment().isHeadless) {
      //TODO implement this in a global resolver, this has no place being in the app componnet
      const userFromStorage = this.storageService.getObject(StorageKeys.USER);
      if (userFromStorage) {
        this.userStoreService.user.set(userFromStorage as UserData);
      } else {
        const defaultUser = getDefaultUserObject();
        this.userStoreService.user.set(defaultUser);
      }
    }
  }
}
