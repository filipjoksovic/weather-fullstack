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
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.authStore.user$
      .pipe(
        filter(user => user !== null),
        tap(() => {
          this.router.navigate(['/']);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
