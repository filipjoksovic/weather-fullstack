import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../../../core/containers/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-home-routing',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AvatarModule,
    ButtonModule,
    SidebarComponent,
    SidebarModule,
  ],
  templateUrl: './home-routing.component.html',
  styleUrl: './home-routing.component.scss',
})
export class HomeRoutingComponent {}
