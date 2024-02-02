import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

import { ToolbarModule } from 'primeng/toolbar';

import { SidebarLinkComponent } from '../../components/sidebar-link/sidebar-link.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    SidebarLinkComponent,
    NgClass,
    ToolbarModule,
    SplitButtonModule,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public isOpen: boolean = true;
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
