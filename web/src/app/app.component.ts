import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PrimeNGConfig } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { AuthStoreService } from '@auth/services/auth.store.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { UserStoreService } from './user/services/user.store.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { StoredUserData, UserData } from './user/models/user-data.model';
import { DateFormatEnum } from '@core/models/date-format';
import { TimeFormatEnum } from '@core/models/time-format';

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
  title = 'web';
  constructor(
    private primengConfig: PrimeNGConfig,
    private readonly authStore: AuthStoreService,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    //TODO implement this in a global resolver, this has no place being in the app componnet
    const userFromStorage = this.storageService.getObject(StorageKeys.USER);
    if (userFromStorage) {
      this.userStoreService.user.set(userFromStorage as UserData);
    } else {
      const defaultUser = {
        firstName: 'Test',
        lastName: 'Account',
        userSettings: {
          dateFormat: DateFormatEnum.SHORT,
          timeFormat: TimeFormatEnum.LONG,
        },
        unitSettings: {
          speed: 'km/h',
          temperature: '°C',
          height: 'mm',
          percentage: '%',
          direction: '°',
          pressure: 'hPa',
        },
      } as UserData;
      this.storageService.setObject(StorageKeys.USER, defaultUser);
      this.userStoreService.user.set(defaultUser);
    }
  }
}
