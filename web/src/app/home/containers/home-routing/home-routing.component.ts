import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../../../core/containers/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LocationSearchComponent } from '../../../location/components/location-search/location-search.component';

@Component({
  selector: 'app-home-routing',
  standalone: true,
  providers: [MessageService],
  templateUrl: './home-routing.component.html',
  imports: [
    RouterOutlet,
    CommonModule,
    AvatarModule,
    ButtonModule,
    SidebarComponent,
    SidebarModule,
    ToastModule,
    LocationSearchComponent,
  ],
})
export class HomeRoutingComponent {}
