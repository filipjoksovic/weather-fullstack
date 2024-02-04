import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvironmentService } from '@core/services/environment.service';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { UserStoreService } from '../../../user/services/user.store.service';
import { getDefaultUserObject } from '../../../user/models/user-data.model';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, MessagesModule],
  templateUrl: './auth-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly userStoreService: UserStoreService
  ) {}

  headlessModeClicked() {
    this.userStoreService.user.set(getDefaultUserObject());
    this.environmentService.switchToHeadless();
  }
}
