import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@core/containers/sidebar/sidebar.component';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, TabViewModule],
  templateUrl: './user-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLayoutComponent {
  private readonly router: Router = inject(Router);

  public activeIndex = 0;

  public redirectToPage(value: number) {
    if (value === 0) {
      this.router.navigate(['profile/user-data']);
    } else if (value === 1) {
      this.router.navigate(['profile/configuration']);
    } else if (value === 2) {
      this.router.navigate(['profile/settings']);
    }
  }
}
