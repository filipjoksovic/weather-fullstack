import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarLinkComponent } from '../../components/sidebar-link/sidebar-link.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AvatarModule, ButtonModule, SidebarLinkComponent, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public isOpen: boolean = true;
  toggleSidebar() {
    console.log('sidebar toggled');
    this.isOpen = !this.isOpen;
  }
}
