import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PrimeNGConfig } from 'primeng/api';
import {
  BrowserAnimationsModule,
  BrowserAnimationsModuleConfig,
} from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    SidebarModule,
    AvatarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'web';
  sidebarVisible: boolean = false;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
