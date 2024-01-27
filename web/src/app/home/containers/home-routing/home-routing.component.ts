import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../../../core/containers/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

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
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './home-routing.component.html',
  styleUrl: './home-routing.component.scss',
})
export class HomeRoutingComponent implements OnInit {
  ngOnInit() {}
}
